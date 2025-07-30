let collectieGlobal = [];

document.getElementById('zoek').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = collectieGlobal.filter(item =>
    `${item.merk} ${item.model}`.toLowerCase().includes(query)
  );
  renderCollection(filtered);
});

async function fetchData() {
  try {
    const response = await fetch('data/collection.json');
    if (!response.ok) throw new Error('Bestand niet gevonden');
    const data = await response.json();
    collectieGlobal = data;
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
      <img src="img/${item.foto || 'placeholder.jpg'}" alt="${item.merk ?? 'Onbekend'} ${item.model ?? ''}" onerror="this.src='img/placeholder.jpg'">
      <div class="card-content">
        <h3>${item.merk ?? 'Onbekend'} ${item.model ?? ''}</h3>
        <p>Schaal: ${item.schaal ?? '–'}</p>
        <p>Bouwjaar: ${item.jaar ?? '–'}</p>
        ${item.coureur ? `<p>Coureur: ${item.coureur}</p>` : ''}
        ${item.opmerking ? `<p><em>${item.opmerking}</em></p>` : ''}
      </div>`;
    container.appendChild(card);
  });
}

fetchData();
