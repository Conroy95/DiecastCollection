const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');

let cars = [];

async function fetchData() {
  try {
    const res = await fetch('data/database.json');
    if (!res.ok) throw new Error('Kon database.json niet laden');
    cars = await res.json();
    displayCars(cars);
  } catch (error) {
    grid.innerHTML = `<p class="error">Fout bij laden data: ${error.message}</p>`;
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
      const imgSrc = car.Afbeelding
        ? car.Afbeelding.startsWith('img/')
          ? car.Afbeelding
          : `img/${car.Afbeelding}`
        : 'img/placeholder.png';

      const opmerking = car.Opmerking && car.Opmerking !== '-' ? car.Opmerking : '';
      const categorie = car.Categorie || '';
      const coureur = car["Coureur/Team"] || car.Coureur || '-';

      return `
      <article class="card" tabindex="0" aria-label="${car.Merk} ${car.Model}">
        <img src="${imgSrc}" alt="${car.Merk} ${car.Model}" loading="lazy" onerror="this.onerror=null;this.src='img/placeholder.png';" />
        <div class="card-content">
          <h2>${car.Merk} ${car.Model}</h2>
          <p>${opmerking}</p>
          <div class="details">Jaar: ${car.Jaar || '-'} | Schaal: ${car.Schaal || '-'} | Coureur: ${coureur}</div>
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
    const coureur = car["Coureur/Team"] || car.Coureur || '';
    return (
      (car.Merk && car.Merk.toLowerCase().includes(term)) ||
      (car.Model && car.Model.toString().toLowerCase().includes(term)) ||
      (car.Categorie && car.Categorie.toLowerCase().includes(term)) ||
      (coureur && coureur.toLowerCase().includes(term)) ||
      (car.Opmerking && car.Opmerking.toLowerCase().includes(term))
    );
  });

  displayCars(filtered);
});

fetchData();
