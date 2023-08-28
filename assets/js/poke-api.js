function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.photo =
    pokeDetail.sprites.other.dream_world.front_default ??
    pokeDetail.sprites.front_default;
  const types = pokeDetail.types.map((item) => item.type.name);
  pokemon.types = types;
  pokemon.type = types[0];
  return pokemon;
}

const pokeApi = {
  getPokemonDetail: (pokemon) =>
    fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon),

  getPokemons: (offset = 0, limit = 20) =>
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((promises) => Promise.all(promises))
      .catch((error) => console.error(error)),
};
