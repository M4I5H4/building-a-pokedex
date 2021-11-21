const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById('searchBar');

// navigation bar toggle start
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});
// navigation bar toggle end


const pokeCache = {}
console.log(pokedex);
//this is the fucntion to get the 151 characters from the API
const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const data = await res.json();
    const pokemon = data.results.map((result, index)=> ({
        ...result, //instead of name: data.name
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`, //calls specific image from API
        
    }))
    
  //filter for searching pokemon
  //toUpperCase makes it case insensative meaning that it will give results regardless of lower or upper case
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toUpperCase();
    const filteredPokemon = pokemon.filter((pokemon) => {
        return pokemon.name.toUpperCase().includes(searchString)
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
//displays chracters on the main list of cards but also had the on click function for when the modal is set to open
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

//suposed to hold ID infomation of the character if already clicked
const selectPokemon = async (id) => {
    if (!pokeCache[id]){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    // pokeCache[id] = pokeman
    displayPopup(pokeman);
    }
    displayPopup(pokeCache[id]);
}

//displays the infomation on the cards on the modal pop up
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
//removes the modalpop up
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon(); //calling the function

