const pokemonForm = document.getElementById('search-form');
const pokemonInput = document.getElementById('pokemon-input');

pokemonForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = pokemonInput.value.trim().toLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/${query}`);

        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const data = await response.json();
        console.log('Name: ', data.name);
    } catch (error) {
        console.error('Error getting Pokémon data', error);
    }
});