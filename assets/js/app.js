// Crear una clase Pokemon
class Pokemon {

    // atributos
    constructor(id, nombre, imagen, tipo) {
        // self.id = id
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.tipo = tipo;
    }

    // metodos
}


// Agregar un evento DOMContentLoader
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formPokemon").addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("txtPokemon").value.trim().toLowerCase();

        buscarPokemonPorNombre(nombre);
    })
});

async function buscarPokemonPorNombre(nombre) {
    // try-except = try-catch

    try {
        // creado la url base
        const API_URL = `https://pokeapi.co/api/v2/pokemon/${nombre}/`

        // peticion a la api PokeAPI
        const resultado = await fetch(API_URL);

        // validar que el resultado haya sido exitoso
        if (!resultado.ok) {
            throw new Error("No se encontro el pokemon");
        } // not = ! and && or ||

        // parsear la informacion a formato json
        const data = await resultado.json()

        // crear el objeto pokemon
        const pokemon = crearObjetoPokemon(data);


        // debbugin
        console.log(pokemon);
        

    } catch (error) {
        console.log(error)
    }

}

function crearObjetoPokemon(json){
    const id = json.id;
    const nombre = json.name;
    const imagen = json.sprites.front_default;
    const tipo = json.types[0].type.name; // arreglos empizan con el indice 0, 1, 2

    return new Pokemon(id, nombre, imagen, tipo);
}