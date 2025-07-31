const grid = document.getElementById('gridContainer');
const searchInput = document.getElementById('searchInput');

fetch('data/database.json')
  .then(res => res.json())
  .then(data => {
    renderCards(data);

    searchInput.addEventListener('input', () => {
      const filtered = data.filter(item =>
        item.Merk.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        item.Coureur.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      renderCards(filtered);
    });
  });

function renderCards(items) {
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="img/${item.Afbeelding || 'placeholder.jpg'}" alt="${item.Merk}" />
      <div class="card-content">
        <h3>${item.Merk} ${item.Model}</h3>
        <p>${item.Jaar} - ${item.Schaal}</p>
        <p><strong>Coureur:</strong> ${item.Coureur}</p>
        <p><em>${item.Opmerking}</em></p>
        <span class="categorie">${item.Categorie}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}
