// Array donde se guardarán los números introducidos por el usuario
let numeros = [];

// ------------------------------------------------------------
// FUNCIÓN: agregarNumero()
// ------------------------------------------------------------
// Añade un número al array desde el input y muestra la lista actual.
function agregarNumero() {
    const input = document.getElementById("numero");
    const valor = parseFloat(input.value);

    // Validar que el valor sea numérico
    if (!isNaN(valor)) {
        // Guardar el número en el array
        numeros.push(valor);
        document.getElementById("lista").textContent =
            "Números guardados: " + numeros.join(" × ");
        // Limpiar el campo
        input.value = "";
    } else {
        alert("Por favor, introduce un número válido.");
    }
}

// ------------------------------------------------------------
// FUNCIÓN: calcularProducto()
// ------------------------------------------------------------
// Calcula el producto (multiplicación) de todos los valores del array.
function calcularProducto() {
    if (numeros.length === 0) {
        alert("No hay números guardados.");
        return;
    }
    // Valor inicial (neutro multiplicativo)
    let producto = 1;

    // Recorremos el array multiplicando cada valor
    for (let i = 0; i < numeros.length; i++) {
        producto *= numeros[i];
    }

    // Mostramos el resultado en el HTML
    document.getElementById("resultado").textContent =
        "El producto de los valores es: " + producto;
}
