const pokemonForm = document.getElementById('search-form');
const pokemonInput = document.getElementById('pokemon-input');

/**
 * Handles the form submission event
 */
pokemonForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = pokemonInput.value.trim().toLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const data = await response.json();

        displayPokemonSprite(data.name, 'sprite-container');
        displayPokemonName(data.name, 'name-container');
    } catch (error) {
        console.error('Error getting Pokémon data', error);
    }
});

/**
 * Displays the sprite of a Pokémon in the specified container
 * 
 * @param {*} pokemonNameOrId the name or ID of the Pokémon to fetch the sprite for
 * @param {*} spriteContainerId the ID of the container where the sprite will be displayed
 */
async function displayPokemonSprite(pokemonNameOrId, spriteContainerId) {
    const spriteContainer = document.getElementById(spriteContainerId);

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const data = await response.json();
        const sprite = document.createElement('img');
        sprite.src = data.sprites.front_default;
        sprite.alt = `${pokemonNameOrId}'s sprite`;
        
        spriteContainer.innerHTML = '';
        spriteContainer.appendChild(sprite);

    } catch (error) {
        console.error('There was a problem displaying the sprite', error);
    }
}

/**
 * Displays the name of a Pokémon in the specified container
 * 
 * @param {*} pokemonNameOrId the name or ID of the Pokémon to display
 * @param {*} nameContainerId the ID of the container where the name will be displayed
 */
async function displayPokemonName(pokemonNameOrId, nameContainerId) {
    const nameContainer = document.getElementById(nameContainerId);

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        
        const data = await response.json();
        const nameField = document.createElement('p');
        nameField.textContent = data.name;
        nameContainer.appendChild(nameField);

        nameContainer.style.textTransform = 'capitalize';
        
    } catch (error) {
        console.error('There was a problem displaying the name', error);
    }
}