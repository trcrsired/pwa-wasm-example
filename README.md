# PWA WASM Example

A progressive web app (PWA) demo that showcases **WebAssembly integration** with offline support.  
Developed by the author of this PWA Store.

---

## ✨ Features

- **WebAssembly (WASM)**: Loads a compiled C++ module (`hello.wasm`) directly in the browser.
- **DOM Injection**: Exports raw HTML strings from C++ and injects them into the page.
- **Service Worker**: Provides offline caching and cache‑first strategies for static assets.
- **PWA Ready**: Includes manifest, icons, and installable support.
- **Open Source**: Licensed under GNU GPL v3.0.

---

## 📂 Project Structure

pwa-wasm-example/ ├── index.html # Main entry page ├── app.js # WASM loader ├── sw.js # Service worker logic ├── sw-register.js # Service worker registration ├── hello.wasm # Compiled WebAssembly binary ├── style.css # Stylesheet ├── manifest.webmanifest # PWA manifest └── icon.webp # App icon

Code

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/trcrsired/pwa-wasm-example.git
   cd pwa-wasm-example
Install the custom LLVM toolchain and sysroots:

Download from llvm-releases

Extract wasm-sysroots.tar.xz to your system.

Build with CMake:

## 🔨 Compilation

This project requires only **CMake** and the custom LLVM toolchain provided here:  
[LLVM Releases](https://github.com/trcrsired/llvm-releases/releases)

1. Download and extract `wasm-sysroots.tar.xz` into your toolchain directory.

   Example layout:
${YOUR_WASM_SYSROOT_INSTALL_PATH}/wasm-sysroots/
    └── wasm-noeh-sysroot/
    └── wasm32-wasip1/

${YOUR_CLONED_PWA_WASM_EXAMPLE_PATH}/pwa-wasm-example/

⚠️ **Important:** Do not forget to copy the provided **builtins** into  
`${llvm_installation_path}/lib/clang/${llvm_version}/`  
so that the compiler can correctly resolve headers and runtime support.

2. Configure the build with CMake (replace the placeholders with your actual paths):

```bash
cmake -GNinja ${YOUR_CLONED_PWA_WASM_EXAMPLE_PATH}/pwa-wasm-example/cpp \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_C_COMPILER=clang \
  -DCMAKE_CXX_COMPILER=clang++ \
  -DCMAKE_C_COMPILER_TARGET=wasm32-wasip1 \
  -DCMAKE_CXX_COMPILER_TARGET=wasm32-wasip1 \
  -DCMAKE_SYSROOT=${YOUR_WASM_SYSROOT_INSTALL_PATH}/wasm-sysroots/wasm-noeh-sysroot/wasm32-wasip1 \
  -DCMAKE_SYSTEM_NAME=wasi \
  -DCMAKE_SYSTEM_PROCESSOR=wasm \
  -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=On \
  -DCMAKE_INSTALL_PREFIX=${YOUR_CLONED_PWA_WASM_EXAMPLE_PATH}/pwa-wasm-example
Build and install:

bash
ninja
ninja install/strip
```
This will produce hello.wasm and install it into your project’s pwa-wasm-example directory.

---

- **`${YOUR_WASM_SYSROOT_INSTALL_PATH}`** → where you extracted `wasm-sysroots.tar.xz`.  
- **`${YOUR_CLONED_PWA_WASM_EXAMPLE_PATH}`** → where you cloned the project.  
- Keeps the README portable and avoids hardcoding absolute paths.

🛠️ How It Works
app.js loads hello.wasm using WebAssembly.instantiateStreaming.

The WASM module exports get_html_ptr and get_html_len to provide a pointer + length for an HTML fragment.

JavaScript decodes the fragment and injects it into #output.

sw.js caches assets and serves them offline, with a network‑first strategy for WASM files to ensure fresh builds.

📱 PWA Capabilities
Installable on desktop and mobile.

Offline support via service worker.

Manifest defines name, icons, theme color, and start URL.

📜 License
This project is licensed under the GNU GPL v3.0. See the LICENSE file for details.
