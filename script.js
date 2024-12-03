const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const typesContainer = document.getElementById('types');
const sprite = document.getElementById('sprite');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

function formatQuery(query) {
  // Handle gendered Pokémon names
  if (query.toLowerCase() === 'nidoran♀') return 'nidoran-f';
  if (query.toLowerCase() === 'nidoran♂') return 'nidoran-m';

  // Convert spaces or special characters to dash-separated lowercase
  return query.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

searchButton.addEventListener('click', async () => {
  const query = formatQuery(searchInput.value.trim());
  if (!query) {
    alert('Please enter a Pokémon name or ID.');
    return;
  }

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`);
    if (!response.ok) {
      alert('Pokémon not found');
      return;
    }

    const data = await response.json();

    // Update Pokémon details
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAttack.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDefense.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

    // Update sprite
    sprite.src = data.sprites.front_default;
    sprite.alt = `${data.name} sprite`;

    // Update types
    typesContainer.innerHTML = '';
    data.types.forEach(type => {
      const typeSpan = document.createElement('span');
      typeSpan.textContent = type.type.name.toUpperCase();
      typesContainer.appendChild(typeSpan);
    });
  } catch (error) {
    alert('Pokémon not found');
    console.error(error);
  }
});
