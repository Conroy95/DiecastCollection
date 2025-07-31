const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');

let cars = [];

async function fetchData() {
  try {
    const res = await fetch('data/database.json');
    cars = await res.json();
    displayCars(cars);
  } catch (error) {
    grid.innerHTML = `<p>Fout bij laden data.</p>`;
    console.error(error);
  }
}

function displayCars(list) {
  if (!list.length) {
    grid.innerHTML = '<p>Geen resultaten gevonden.</p>';
    return;
  }

  grid.innerHTML = list
    .map((car) => {
      // Zorg dat afbeelding klopt
      const imgSrc = car.Afbeelding
        ? car.Afbeelding.startsWith('img/') ? car.Afbeelding : `img/${car.Afbeelding}`
        : 'img/placeholder.jpg';

      // Zet lege velden op lege string
      const opmerking = car.Opmerking || '';
      const categorie = car.Categorie || '';

      return `
      <article class="card" tabindex="0" aria-label="${car.Merk} ${car.Model}">
        <img src="${imgSrc}" alt="${car.Merk} ${car.Model}" />
        <div class="card-content">
          <h2>${car.Merk} ${car.Model}</h2>
          <p>${opmerking}</p>
          <div class="details">Jaar: ${car.Jaar || '-'} | Schaal: ${car.Schaal || '-'} | Coureur: ${car.Coureur || '-'}</div>
          <div class="details">Categorie: ${categorie}</div>
        </div>
      </article>`;
    })
    .join('');
}

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.trim().toLowerCase();
  if (!term) {
    displayCars(cars);
    return;
  }
  const filtered = cars.filter((car) => {
    return (
      (car.Merk && car.Merk.toLowerCase().includes(term)) ||
      (car.Model && car.Model.toLowerCase().includes(term)) ||
      (car.Categorie && car.Categorie.toLowerCase().includes(term)) ||
      (car.Coureur && car.Coureur.toLowerCase().includes(term))
    );
  });
  displayCars(filtered);
});

fetchData();
