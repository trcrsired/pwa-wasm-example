async function loadWasm() {
  // Check if WebAssembly is supported
  if (typeof WebAssembly === "undefined") {
    document.getElementById("output").innerHTML =
      "<p><strong>WebAssembly is not supported in this browser.</strong><br>";
    return;
  }

  try {
    const response = await fetch("hello.wasm");
    const { instance } = await WebAssembly.instantiateStreaming(response);
    const { memory, get_html_ptr, get_html_len } = instance.exports;

    const ptr = get_html_ptr();
    const len = get_html_len();

    const bytes = new Uint8Array(memory.buffer, ptr, len);
    const html = new TextDecoder("utf-8").decode(bytes);

    // Inject into DOM
    document.getElementById("output").innerHTML = html;
  } catch (err) {
    // Handle errors gracefully
    console.error("Failed to load WASM:", err);
    document.getElementById("output").innerHTML =
      "<p><strong>Failed to load WebAssembly module.</strong></p>";
  }
}

loadWasm();
