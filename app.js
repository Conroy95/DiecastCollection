if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('SW geregistreerd', reg))
    .catch(err => console.error('SW fout', err));
}
