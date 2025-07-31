self.addEventListener('install', e => {
  console.log('Service Worker geïnstalleerd');
});

self.addEventListener('fetch', e => {
  // Optioneel: caching
});
