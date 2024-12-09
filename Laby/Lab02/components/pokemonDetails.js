function PokemonDetails({ pokemon }) {
    if (!pokemon) {
        return <p>Brak wyników</p>;
    }
  
    return (
      <div className="details">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Typy: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Wzrost: {(pokemon.height / 10).toFixed(1)} m</p>
        <p>Waga: {(pokemon.weight / 10).toFixed(1)} kg</p>
        <p>Statystyki:</p>
        <ul>
          {pokemon.stats.map(stat => <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>)}
        </ul>
      </div>
    );
}

export default PokemonDetails;