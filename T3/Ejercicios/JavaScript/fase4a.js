// Array vacío donde se guardarán los números introducidos por el usuario
let numeros = [];

// -------------------------------------------------------
// FUNCIÓN: agregarNumero()
// -------------------------------------------------------
// Toma el valor del input, lo convierte a número y lo guarda en el array.
// Luego muestra la lista actualizada en pantalla.
function agregarNumero() {
    // Obtenemos el elemento <input>
    const input = document.getElementById("numero");
    // Convertimos el texto a número decimal
    const valor = parseFloat(input.value);

    // Comprobamos que el valor sea un número válido (no NaN)
    if (!isNaN(valor)) {
        // Añadimos el número al array
        numeros.push(valor);

        // Mostramos los números guardados separados por guion
        document.getElementById("lista").textContent =
            "Números guardados: " + numeros.join(" _ ");

        // Limpiamos el campo de entrada
        input.value = "";
    } else {
        // Si no es un número, mostramos una alerta
        alert("Por favor, introduce un número válido");
    }
}

// -------------------------------------------------------
// FUNCIÓN: calcularSuma()
// -------------------------------------------------------
// Recorre el array de números, calcula la suma total y la muestra en pantalla.
function calcularSuma() {
    // Comprobamos que haya números guardados
    if (numeros.length === 0) {
        alert("No hay números guardados");
        // Salimos de la función si el array está vacío
        return;
    }
    // Variable acumuladora
    let suma = 0;

    // Recorremos el array sumando cada número
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }

    // Mostramos el resultado de la suma en el elemento con id="resultado"
    document.getElementById("resultado").textContent =
        "La suma de la matriz es: " + suma;
}
