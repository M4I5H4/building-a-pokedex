const pokedex = document.getElementById("pokedex");
console.log(pokedex);
//this is the fucntion to get the pokemon
const fetchPokemon = () => {
    console.log('Fetching Pokemon')// checking that the function is working

    const promises = [];
    for (let i = 1; i <= 150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then( (res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            type: data.types
            .map( (type) => type.type.name) //types is an array so we use the map fuction to loop through
            .join(', ')
    }));
        displayPokemon(pokemon)
        });

};
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
    .map(
        (pokeman) =>
        `<li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>`

        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon(); //calling the function

