import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PokemonList } from './pokemonList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      selectedPokemon: null
  }
}

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(response => response.json())
      .then(data => this.setState({ pokemons: data.results }));
  }

  handlePokemonClick = (pokemon) => {
    this.setState({ selectedPokemon: pokemon });
  }

  render() {
    return (
      <div className="app">
        <PokemonList pokemons={this.state.pokemons} onPokemonClick={this.handlePokemonClick} />
        {this.state.selectedPokemon && <p>Wybrany Pokemon: {this.state.selectedPokemon}</p>}
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('app'));