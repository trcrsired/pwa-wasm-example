#include <cstddef>

namespace
{
// Embed HTML using a UTF-8 raw string literal with char8_t
inline constexpr char8_t html_str[] = u8R"(
<section>
  <h1>WASM Hello Demo</h1>
  <p>This DOM fragment is generated from C++ using <code>char8_t</code> and a raw string literal.</p>
  <ul>
    <li>Fast</li>
    <li>Portable</li>
    <li>Fun</li>
  </ul>
  <p>
    Source code is available at
    <a href="https://github.com/trcrsired/pwa-wasm-example" target="_blank">
      github.com/trcrsired/pwa-wasm-example
    </a>.
    <br>
    This project is licensed under the GNU General Public License v3.0.
  </p>
</section>
)";
}

extern "C"
{
    [[__gnu__::__visibility__("default")]]
    char8_t const* get_html_ptr() noexcept {
        return html_str;
    }

    [[__gnu__::__visibility__("default")]]
    std::size_t get_html_len() noexcept {
        return sizeof(html_str) - 1; // exclude null terminator
    }
}
