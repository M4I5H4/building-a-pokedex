const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById('searchBar');

const pokeCache = {}
console.log(pokedex);
//this is the fucntion to get the pokemon
const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    const data = await res.json();
    const pokemon = data.results.map((result, index)=> ({
        
      ...result, //instead of name: data.name
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        

    }))
  
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    const filteredPokemon = pokemon.filter((pokemon) => {
        return pokemon.name.includes(searchString)
    });
displayPokemon(filteredPokemon)
});
    displayPokemon(pokemon)
};

    // part 1 of video uses code below
    // console.log('Fetching Pokemon')// checking that the function is working

    // const promises = [];
    // for (let i = 1; i <= 150; i++){
    //     const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    //     promises.push(fetch(url).then( (res) => res.json()));
    // }
    // Promise.all(promises).then((results) => {
    //     const pokemon = results.map((data) => ({
    //         name: data.name,
    //         id: data.id,
    //         image: data.sprites.front_default,
    //         type: data.types
    //         .map( (type) => type.type.name) //types is an array so we use the map fuction to loop through
    //         .join(', ')
    // }));
    //     displayPokemon(pokemon)
    //     });

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
    .map(
        (pokeman) =>
        `<li class="card" onclick="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </li>`

        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
}
const selectPokemon = async (id) => {
    if (!pokeCache[id]){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman
    displayPopup(pokeman);
    }
    displayPopup(pokeCache[id]);
}

const displayPopup = (pokeman) => {
   
    const type = pokeman.types.map(type => type.type.name)
    .join(', ');
    const image = pokeman.sprites.front_default
    const htmlString = `
    <div class="popup">
        <button id="closeBtn"
        onclick="closePopup()">Close
        </button>
        <div class="card">
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p><small>Height: </small>${pokeman.height} | 
            <p><small>Weight: </small>${pokeman.weight} |
            <p><small>Type: </small>${type} 
        </div>
    </div>`;
pokedex.innerHTML = htmlString + pokedex.innerHTML;
console.log(htmlString)

}

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon(); //calling the function

