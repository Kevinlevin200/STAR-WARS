const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query.length > 0) {
    fetchCharacters(query);
  } else {
    resultsDiv.innerHTML = "";
  }
});

async function fetchCharacters(searchTerm) {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/people/?search=${searchTerm}`);
    const data = await response.json();
    displayCharacters(data.results);
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error al cargar los personajes.</p>";
    console.error(error);
  }
}

function displayCharacters(characters) {
  resultsDiv.innerHTML = "";

  if (characters.length === 0) {
    resultsDiv.innerHTML = "<p>No se encontraron personajes.</p>";
    return;
  }

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${character.name}</h2>
      <p><strong>Altura:</strong> ${character.height} cm</p>
      <p><strong>Peso:</strong> ${character.mass} kg</p>
      <p><strong>Color de cabello:</strong> ${character.hair_color}</p>
      <p><strong>Color de piel:</strong> ${character.skin_color}</p>
      <p><strong>Color de ojos:</strong> ${character.eye_color}</p>
      <p><strong>Año de nacimiento:</strong> ${character.birth_year}</p>
      <p><strong>Género:</strong> ${character.gender}</p>
    `;
    resultsDiv.appendChild(card);
  });
}
