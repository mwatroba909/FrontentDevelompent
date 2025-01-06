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

// Główna aplikacja
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            selectedPokemon: null,
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.fetchPokemons();
    }

    fetchPokemons() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ pokemons: data.results });
            })
            .catch((error) => console.error('Failed to fetch pokemons', error));
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handlePokemonClick(pokemon) {
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ selectedPokemon: data });
            })
            .catch((error) => console.error('Failed to fetch pokemon details', error));
    }

    render() {
        const filteredPokemons = this.state.pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        return (
            <div>
                <header>
                    <h1>PokedeX</h1>
                    <section id="search-section">
                        <input
                            type="text"
                            id="search-bar"
                            placeholder="Search Pokemon..."
                            value={this.state.searchQuery}
                            onChange={(e) => this.handleSearchChange(e)}
                        />
                    </section>
                </header>

                <main>
                    <section id="pokemon-list">
                        <h2>Pokemon List</h2>
                        <PokemonList
                            pokemons={filteredPokemons}
                            onPokemonClick={(pokemon) => this.handlePokemonClick(pokemon)}
                        />
                    </section>

                    <section id="pokemon-details">
                        <h2>Pokemon Details</h2>
                        <PokemonDetails pokemon={this.state.selectedPokemon} />
                    </section>
                </main>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
