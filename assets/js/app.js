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
        // pokemon.tipo.forEach(element => {
        //     console.log(element.type.name);
        // });

        // console.log(pokemon);
        

    } catch (error) {
        console.log(error)
    }

}

function crearObjetoPokemon(json){
    const id = json.id;
    const nombre = json.name;
    const imagen = json.sprites.front_default;
    const tipo = json.types; // arreglos empizan con el indice 0, 1, 2

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

    // crear un elemento card-body
    const body = document.createElement("div");
    body.classList.add("card-body");

    // crear un elemento h5
    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = pokemon.nombre;

    // crear un elemento p
    const pid = document.createElement("p");
    pid.classList.add("card-text");
    pid.textContent = pokemon.id;

    // Ensamblar los elementos

    body.appendChild(titulo);
    body.appendChild(pid);

    // Mostrar todos los tipos de pokemones que extraemos de la consulta   

    pokemon.tipo.forEach(e => {
        
        // crear un elemento p
        const tipo = document.createElement("p");
        tipo.classList.add("card-text");

        // crear un elemento badge
        const badge = document.createElement("span");

        if (e.type.name === 'fire') badge.classList.add("badge", "bg-danger");
        else if (e.type.name === 'water') badge.classList.add("badge", "bg-primary");
        else if (e.type.name === 'electric') badge.classList.add("badge", "bg-warning");
        else badge.classList.add("badge", "bg-secondary");

        badge.textContent = e.type.name;

        // ensamblar
        tipo.appendChild(badge);

        body.appendChild(tipo);

    });    

    card.appendChild(img);
    card.appendChild(body);

    col.appendChild(card);

    const div = document.getElementById("contendor-pokemon");
    div.appendChild(col);

}