class PokemonDetails extends React.Component {
    render() {
        const { pokemon } = this.props;

        if (!pokemon) {
            return <p>Select a Pokemon to see details.</p>;
        }

        return (
            <div>
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: 150, height: 150 }} />
                <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                <p><strong>Height:</strong> {pokemon.height} m</p>
                <p><strong>Type:</strong> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            </div>
        );
    }
}

export default PokemonDetails;
