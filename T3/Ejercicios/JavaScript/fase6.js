// Array donde se guardarán los números introducidos por el usuario
let numeros = [];

// ------------------------------------------------------------
// FUNCIÓN: agregarNumero()
// ------------------------------------------------------------
// Toma el número del input y lo guarda en el array, mostrando la lista actual.
function agregarNumero() {
    // Referencia al input
    const input = document.getElementById("numero");
    // Convertimos el texto a número
    const valor = parseFloat(input.value);

    // Validamos que sea un número
    if (!isNaN(valor)) {
        // Añadimos al array
        numeros.push(valor);
        document.getElementById("lista").textContent =
            "Números guardados: " + numeros.join(" _ ");
        // Limpiamos el campo
        input.value = "";
    } else {
        alert("Por favor, introduce un número válido.");
    }
}

// ------------------------------------------------------------
// FUNCIÓN: encontrarMaximo(array)
// ------------------------------------------------------------
// Devuelve el valor más alto dentro del array recibido como parámetro.
function encontrarMaximo(array) {
    // Usamos Math.max junto con el operador spread (...) para comparar todos los elementos
    return Math.max(...array);
}

// ------------------------------------------------------------
// FUNCIÓN: mostrarMaximo()
// ------------------------------------------------------------
// Llama a encontrarMaximo() y muestra el resultado en pantalla.
function mostrarMaximo() {
    if (numeros.length === 0) {
        alert("No hay números guardados.");
        return;
    }

    const maximo = encontrarMaximo(numeros);
    document.getElementById("resultado").textContent =
        "El valor más alto en la matriz es: " + maximo;
}
