// Increment this version when you change files
const CACHE_VERSION = "v1";
const CACHE_NAME = `wasm-demo-cache-${CACHE_VERSION}`;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app.js",
        "./hello.wasm",
        "./manifest.webmanifest"
      ]);
    })
  );
});

// Clean up old caches when a new version is installed
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
