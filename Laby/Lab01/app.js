async function renderPokemonList() {
  const listContainer = document.querySelector('.list');
  const pokemonList = await fetchPokemonList();
  
  if (pokemonList.length === 0) {
    listContainer.innerHTML += "<p>Brak wyników do wyświetlenia</p>";
    return;
  }

  listContainer.innerHTML = '<h1>Lista Pokemonów</h1>';
  pokemonList.forEach((pokemon, index) => {
    const listItem = document.createElement('div');
    listItem.textContent = `${index + 1}. ${pokemon.name}`;
    listItem.classList.add('pokemon-item');
    listItem.addEventListener('click', () => renderPokemonDetails(pokemon.name));
    listContainer.appendChild(listItem);
  });
}

window.onload = async () => {
  await renderPokemonList(); 
  const searchInput = document.querySelector('#search');
  const suggestionsContainer = document.querySelector('#suggestions');

  searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (query) {
      const suggestions = await searchPokemon(query);
      displaySuggestions(suggestions, query, suggestionsContainer);
    } else {
      suggestionsContainer.style.display = 'none'; 
    }
  });
};

async function searchPokemon(query) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Błąd: ${response.statusText}`);
    }
    const data = await response.json();
    const filteredPokemons = data.results.filter(pokemon => pokemon.name.toLowerCase().includes(query));
    return filteredPokemons;
  } catch (error) {
    console.error("Nie udało się pobrać wyników wyszukiwania:", error);
    return [];
  }
}

function displaySuggestions(suggestions, query, container) {
  container.innerHTML = '';
  if (suggestions.length > 0) {
    container.style.display = 'block'; 
    suggestions.forEach(pokemon => {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = pokemon.name;
      suggestionItem.addEventListener('click', () => {
        document.querySelector('#search').value = pokemon.name;
        container.style.display = 'none'; 
        renderPokemonDetails(pokemon.name);
      });
      container.appendChild(suggestionItem);
    });
  } else {
    container.style.display = 'none'; 
  }
}



async function fetchPokemonList() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Błąd: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Nie udało się pobrać listy Pokemonów:", error);
    return [];
  }
}

async function renderPokemonDetails(nameOrId) {
  const detailsContainer = document.querySelector('.details');
  const pokemonData = await fetchPokemonDetails(nameOrId);
  
  if (!pokemonData) return;
  
  detailsContainer.innerHTML = `
    <h1>${pokemonData.name}</h1>
    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
    <p>Typy: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
    <p>Wzrost: ${pokemonData.height / 10} m</p>
    <p>Waga: ${pokemonData.weight / 10} kg</p>
    <p>Statystyki:</p>
    <ul>
      ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
    </ul>
  `;
}

async function fetchPokemonDetails(nameOrId) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Błąd: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Nie udało się pobrać szczegółów Pokemona:", error);
    return null;
  }
}
