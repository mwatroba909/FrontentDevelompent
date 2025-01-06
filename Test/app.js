const searchBar = document.getElementById('search-section');
const list = document.getElementById('list');
const details = document.getElementById('details');

const loader = document.createElement("div");
loader.textContent = "Loading...";
loader.style.textAlign = "center";
loader.style.padding = "20px";
loader.style.fontWeight = "bold";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemons() {
    try {
        list.innerHTML = "";
        list.appendChild(loader);

        const response = await fetch(`${API_URL}?limit=20`);
        if (!response.ok) {
            throw new Error("Failed to fetch pokemons");
        }

        const data = await response.json();

        displayPokemonList(data.results);
    } catch (error) {
        console.error(error);
        list.innerHTML = `<p style="text-align: center;">failed: ${error.message}</p>`;
    } finally {
        if (list.contains(loader)) {
            list.removeChild(loader);
        }
    }
}

function displayPokemonList(pokemonsList) {
    list.innerHTML = "";
    if (pokemonsList.length === 0) {
        list.innerHTML = "<p>No Pokemons found.</p>";
    }
    pokemonsList.forEach((pokemon, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
        listItem.addEventListener("click", () => {
            fetchPokemonDetails(pokemon.url);
        });
        list.appendChild(listItem);
    });
}

async function fetchPokemonDetails(url) {
    try {
        details.innerHTML = "";
        details.appendChild(loader);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch pokemon details");
        }

        const data = await response.json();

        console.log(data);
        displayPokemonDetails(data);
    } catch (error) {
        console.error(error);
        details.innerHTML = `<p style="text-align: center;">failed: ${error.message}</p>`;
    } finally {
        if (details && details.contains(loader)) {
            details.removeChild(loader);
        }
    }
}

function displayPokemonDetails(pokemon) {
    details.innerHTML = `
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width: 150px; height: 150px;">
        <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
        <p><strong>Height:</strong> ${pokemon.height} m</p>
        <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
    `;
}

searchBar.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    searchPokemons(query); 
});

async function searchPokemons(query) {
    try {
        list.innerHTML = "";
        if (query.trim() === "") {
            fetchPokemons(); 
            return;
        }

        const response = await fetch(`${API_URL}?limit=1000`); 
        if (!response.ok) {
            throw new Error("Failed to fetch pokemons");
        }

        const data = await response.json();

        const filteredPokemons = data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query)
        );

        displayPokemonList(filteredPokemons);
    } catch (error) {
        console.error(error);
        list.innerHTML = `<p style="text-align: center;">failed: ${error.message}</p>`;
    }
}

fetchPokemons();
