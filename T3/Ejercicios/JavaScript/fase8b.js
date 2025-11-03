// Array donde se guardarán los valores introducidos
let elementos = [];

//------------------------------------------------------------
//Función para agregar un valor al array
//------------------------------------------------------------
function agregarElemento() {
    const input = document.getElementById("valor");
    // quitar espacios innecesarios
    const valor = input.value.trim();

    if (valor !== "") {
        elementos.push(valor); // guardar valor en el array

        // Mostrar los elementos guardados
        document.getElementById("lista").textContent =
            "Elementos guardados: " + elementos.join(", ");
        // limpiar input
        input.value = "";
    } else {
        alert("Por favor, introduce un valor válido");
    }
}

//------------------------------------------------------------
// Función para encontrar los elementos más frecuentes del array
//------------------------------------------------------------
function elementoMasFrecuente() {
    if (elementos.length === 0) {
        alert("No hay elementos guardados");
        return;
    }

    // Objeto para contar cuántas veces aparece cada elemento
    let contador = {};
    let maxFrecuencia = 0;

    // Recorrer el array y contar cada elemento
    for (let i = 0; i < elementos.length; i++) {
        let valor = elementos[i];
        contador[valor] = (contador[valor] || 0) + 1;

        // Actualizamos la frecuencia máxima
        if (contador[valor] > maxFrecuencia) {
            maxFrecuencia = contador[valor];
        }
    }

    // Buscar todos los elementos que tienen la frecuencia máxima
    let masFrecuentes = [];
    for (let clave in contador) {
        if (contador[clave] === maxFrecuencia) {
            masFrecuentes.push(clave);
        }
    }

    // Mostrar el resultado en el HTML
    if (masFrecuentes.length === 1) {
        document.getElementById("resultado").textContent =
            `El elemento más frecuente es "${masFrecuentes[0]}" (aparece ${maxFrecuencia} veces)`;
    } else {
        document.getElementById("resultado").textContent =
            `Los elementos más frecuentes son [${masFrecuentes.join(", ")}] (aparecen ${maxFrecuencia} veces)`;
    }
}
