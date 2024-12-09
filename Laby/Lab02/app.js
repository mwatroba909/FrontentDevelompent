import React, { useState, useEffect } from 'react';
import { PokemonList } from './components/PokemonList';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, []);

  return (
    <div className="app">
      <PokemonList pokemons={pokemons} onPokemonClick={setSelectedPokemon} />
      {selectedPokemon && <p>Wybrany Pokemon: {selectedPokemon}</p>}
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('app'));