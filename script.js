async function fetchData() {
  try {
    const response = await fetch('data/collection.json');
    if (!response.ok) throw new Error('Bestand niet gevonden');
    const data = await response.json();
    renderCollection(data);
  } catch (error) {
    document.getElementById('collection').innerHTML = '<p>Fout bij laden data: ' + error.message + '</p>';
  }
}

function renderCollection(collection) {
  const container = document.getElementById('collection');
  container.innerHTML = '';
  collection.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="img/${item.foto}" alt="${item.merk} ${item.model}">
      <div class="card-content">
        <h3>${item.merk} ${item.model}</h3>
        <p>Schaal: ${item.schaal}</p>
        <p>Bouwjaar: ${item.jaar}</p>
      </div>`;
    container.appendChild(card);
  });
}
fetchData();