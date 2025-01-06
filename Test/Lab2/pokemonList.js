class PokemonList extends React.Component {
    render() {
        const { pokemons, onPokemonClick } = this.props;

        return (
            <ul>
                {pokemons.length === 0 ? (
                    <p>No Pokemons found.</p>
                ) : (
                    pokemons.map((pokemon, index) => (
                        <li key={index} onClick={() => onPokemonClick(pokemon)}>
                            {index + 1}. {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </li>
                    ))
                )}
            </ul>
        );
    }
}

// Eksportowanie komponentu
export default PokemonList;
