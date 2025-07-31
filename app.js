(async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js');
      console.info('Service Worker geregistreerd');
    } catch (err) {
      console.error('Fout bij registreren Service Worker:', err);
    }
  }
})();
