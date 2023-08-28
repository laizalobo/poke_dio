const pokemonList = document.querySelector(".pokemons");
const loadMoreButton = document.querySelector("#loadMoreButton");
let limit = 10;
let offset = 0;

const maxPokemons = 1281;

const convertPokemonToLi = ({
  name,
  number,
  type,
  types,
  photo,
}) => `<li class="pokemon ${type}">
    <span class="number">#${String(number).padStart(3, "0")}</span>
    <span class="name">${name}</span>

    <div class="detail">
      <ol class="types">
        ${types.map((item) => `<li class="type ${item}">${item}</li>`).join("")}
      </ol>

      <img src="${photo}" alt="${name}" />
    </div>
  </li>`;

function listToHtml(pokemons) {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
}

function loadPokemonItems() {
  return pokeApi
    .getPokemons(offset, limit)
    .then(listToHtml)
    .catch((error) => console.error(error));
}

loadPokemonItems();

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qttRecordNextPage = offset + limit;
  if (qttRecordNextPage >= maxPokemons) {
    limit = maxPokemons - offset;
    loadPokemonItems();
    loadMoreButton.parentElement.removeChild(loadMoreButton);
    return;
  }
  loadPokemonItems().then(() => window.scrollTo(0, document.body.scrollHeight));
});
