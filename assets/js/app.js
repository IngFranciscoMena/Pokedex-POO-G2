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

        mostrarPokemon(pokemon);
        // debbugin
        

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

function mostrarPokemon(pokemon){
    // Crear elementos html para mostrar la información

    // crear un elemento div para alamcenar el card
    const col = document.createElement("div");
    col.classList.add("col-12", "col-sm-9", "col-md-6", "col-lg-3");

    // crear el elemento card
    const card = document.createElement("div");
    card.classList.add("card", "h-100", "text-center", "shadow-lg");

    // crear elemento imágen
    const img = document.createElement("img");
    img.classList.add("card-img-top", "p-3");
    img.src = pokemon.imagen;
    img.alt = pokemon.nombre;


    // Ensamblar los elementos
    card.appendChild(img);

    col.appendChild(card);

    const div = document.getElementById("contendor-pokemon");
    div.appendChild(col);

}