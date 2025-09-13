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

        // parsear la informacion
        const json = await resultado.json()

        // debbugin
        console.log(json);

    } catch (error) {
        console.log(error)
    }

}