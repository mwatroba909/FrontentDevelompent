async function fetchPokemonDetails(nameOrId) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
  try {
    showLoadingIndicator();
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Błąd: ${response.statusText}`);
    }
    const data = await response.json();
    hideLoadingIndicator();
    return data;
  } catch (error) {
    hideLoadingIndicator();
    console.error("Nie udało się pobrać szczegółów Pokemona:", error);
    alert(
      "Nie udało się pobrać szczegółów Pokemona. Spróbuj ponownie później."
    );
    return null;
  }
}
