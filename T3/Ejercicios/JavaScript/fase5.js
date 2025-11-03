// Array donde se guardarán los elementos introducidos
let elementos = [];

// ------------------------------------------------------------
// FUNCIÓN: agregarElemento()
// ------------------------------------------------------------
// Añade un nuevo valor (texto) al array y muestra la lista actual.
function agregarElemento() {
    const input = document.getElementById("elemento");
    // Quitamos espacios innecesarios
    const valor = input.value.trim();

    if (valor !== "") {
        // Guardamos el texto en el array
        elementos.push(valor);
        document.getElementById("lista").textContent =
            "Elementos guardados: " + elementos.join(", ");
        // Limpiamos el campo de texto
        input.value = "";
    } else {
        alert("Por favor, introduce un elemento válido.");
    }
}

// ------------------------------------------------------------
// FUNCIÓN: unirElementos()
// ------------------------------------------------------------
// Une todos los elementos del array en una sola cadena.
function unirElementos() {
    if (elementos.length === 0) {
        alert("No hay elementos guardados.");
        return;
    }

    // Usamos join() para unirlos con un espacio entre ellos
    const cadena = elementos.join(" ");

    // Mostramos el resultado en el HTML
    document.getElementById("resultado").textContent =
        "Cadena resultante: " + cadena;
}
