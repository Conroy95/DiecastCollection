self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('diecast-cache-v1').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'manifest.json',
        'app.js',
        'script.js'
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});