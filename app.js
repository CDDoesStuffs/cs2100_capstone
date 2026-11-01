const pokemonForm = document.getElementById('search-form');
const pokemonInput = document.getElementById('pokemon-input');

pokemonForm.addEventListener('submit', async (event) => {

    const query = pokemonInput.value.trim().toLoweCase();

    try {
        const response = await fetch('https://pokeapi.co{query}');
    }
});