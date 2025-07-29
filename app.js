async function loadCollection() {
  try {
    const response = await fetch('data/collection.json');
    const data = await response.json();
    displayCollection(data);
  } catch (error) {
    console.error('Fout bij laden data:', error);
    document.getElementById('collection').innerText = 'Fout bij het laden van de collectie.';
  }
}

function displayCollection(cars) {
  const container = document.getElementById('collection');
  container.innerHTML = '';

  cars.forEach(car => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `img/${car.Afbeelding || car.image || 'placeholder.png'}`;
    img.alt = car.Merk ? `${car.Merk} ${car.Model}` : 'Auto afbeelding';

    const title = document.createElement('h3');
    title.textContent = car.Merk && car.Model ? `${car.Merk} ${car.Model}` : 'Onbekende auto';

    card.appendChild(img);
    card.appendChild(title);

    card.addEventListener('click', () => showModal(car));

    container.appendChild(card);
  });
}

function showModal(car) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-img').src = `img/${car.Afbeelding || car.image || 'placeholder.png'}`;
  document.getElementById('modal-img').alt = car.Merk ? `${car.Merk} ${car.Model}` : 'Auto afbeelding';
  document.getElementById('modal-title').textContent = car.Merk && car.Model ? `${car.Merk} ${car.Model}` : 'Onbekende auto';

  const detailsEl = document.getElementById('modal-details');
  detailsEl.innerHTML = `
    <strong>Jaar:</strong> ${car.Jaar || 'Onbekend'}<br />
    <strong>Schaal:</strong> ${car.Schaal || 'Onbekend'}<br />
    ${car.Opmerking ? `<strong>Opmerking:</strong> ${car.Opmerking}` : ''}
  `;

  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', e => {
  if (e.target.id === 'modal') closeModal();
});

window.addEventListener('load', loadCollection);
