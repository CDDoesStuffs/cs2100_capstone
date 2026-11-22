const pokemonForm = document.getElementById('search-form');
const pokemonInput = document.getElementById('pokemon-input');

/**
 * Handles the form submission event
 */
pokemonForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const pokemonNameOrId = pokemonInput.value.trim().toLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);

        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        document.getElementById('sprite-container').innerHTML = '';
        document.getElementById('name-container').innerHTML = '';
        document.getElementById('details-container').innerHTML = '';
        document.getElementById('iv-container').innerHTML = '';
        document.getElementById('ev-container').innerHTML = '';

        const data = await response.json();

        displayPokemonSprite(data.name, 'sprite-container');
        displayPokemonName(data.name, 'name-container');
        displayPokemonDetails(data.name, 'details-container');
        displayPokemonIVs(data.name, 'iv-container');
        displayPokemonEVs(data.name, 'ev-container');

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
        const name = document.createElement('p');
        name.textContent = data.name;

        nameContainer.innerHTML = ''; 
        nameContainer.appendChild(name);
        nameContainer.style.textTransform = 'capitalize';
        
    } catch (error) {
        console.error('There was a problem displaying the name', error);
    }
}

/**
 * Displays information about a Pokémon in the General Info section other than the sprite or name (e.g., types, abilities, etc.)
 * 
 * @param {*} pokemonNameOrId the name or ID of the Pokémon to display
 * @param {*} infoContainerId the ID of the container where the information will be displayed (General Info section)
 */
async function displayPokemonDetails(pokemonNameOrId, infoContainerId) {
    const infoContainer = document.getElementById(infoContainerId);

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok) {
            throw new Error('Species data not found');
        }
        const speciesData = await speciesResponse.json();

        
        const details = document.createElement('div');
        
        const id = `#${data.id.toString().padStart(3, "0")}`;
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
        const height = data.height / 10;
        const weight = data.weight / 10;
        const eggGroups = speciesData.egg_groups && speciesData.egg_groups.length > 0 ? speciesData.egg_groups.map(groupInfo => groupInfo.name).join(', ') : 'N/A';

        const stats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ');

        details.innerHTML = `
            <p>ID: ${id}</p>
            <p>Types: ${types}</p>
            <p>Abilities: ${abilities}</p>
            <p>Height: ${height} m</p>
            <p>Weight: ${weight} kg</p>
            <p>Base Stats: ${stats}</p>
            <p>Egg Groups: ${eggGroups}</p>
        `;

        infoContainer.appendChild(details); 
        
        } catch (error) {
            console.error('There was a problem displaying the details', error);
        }
    }

    async function displayPokemonIVs(pokemonNameOrId, ivContainerId) {
        const ivContainer = document.getElementById(ivContainerId);
    
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
    
            const data = await response.json();
            const ivs = document.createElement('div');
            
            const ivStats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.effort}`).join(', ');
    
            ivs.innerHTML = `
                <p>IVs: ${ivStats}</p>
            `;
    
            ivContainer.appendChild(ivs);
    
        } catch (error) {
            console.error('There was a problem displaying the IVs', error);
        }
    }

    async function displayPokemonEVs(pokemonNameOrId, evContainerId) {
        const evContainer = document.getElementById(evContainerId);
    
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
    
            const data = await response.json();
            const evs = document.createElement('div');
            
            const evStats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.effort}`).join(', ');
    
            evs.innerHTML = `
                <p>EVs: ${evStats}</p>
            `;
    
            evContainer.appendChild(evs);
    
        } catch (error) {
            console.error('There was a problem displaying the EVs', error);
        }
    }
