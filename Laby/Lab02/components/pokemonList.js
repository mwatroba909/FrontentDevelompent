function PokemonList({ pokemons, onPokemonClick }) {
    console.log("Działa", pokemons);


  if(!pokemons || pokemons.length === 0) {
    return <p>Brak wyników</p>;
    }

    return (
    <div className="list">
        <h1>Lista Pokemonów</h1>
        {pokemons.map((pokemon, index) => (
            <div key={pokemon.name} className="pokemon-item" onClick={() => onPokemonClick(pokemon.name)}>
            {index + 1}. {pokemon.name}
            </div>
        ))}
    </div>
  );
}

export default PokemonList;

