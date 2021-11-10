
//this is the fucntion to get the pokemon
const fetchPokemon = () => {
    console.log('Fetching Pokemon')// checking that the function is working

    const url = `https://pokeapi.co/api/v2/pokemon/1`
    fetch(url)
        .then( res => {
            return res.json();
        })
        .then( data => {
            console.log(data);

            const pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites.front_default,
                type: data.types
                .map( (type) => type.type.name) //types is an array so we use the map fuction to loop through
                .join(', ')
            };
                console.log(pokemon)
        });


};

fetchPokemon(); //calling the fution

