// ------------------------------------------------------------
// FUNCIÓN: obtenerMayor(num1, num2, num3)
// ------------------------------------------------------------
// Recibe tres números y devuelve el más alto de los tres.
function obtenerMayor(num1, num2, num3) {
    // Usamos Math.max() para obtener el valor más grande
    return Math.max(num1, num2, num3);
}

// ------------------------------------------------------------
// FUNCIÓN: mostrarMayor()
// ------------------------------------------------------------
// Toma los valores del HTML, los convierte a número y muestra el mayor.
function mostrarMayor() {
    // Obtenemos los valores de los tres inputs
    const n1 = parseFloat(document.getElementById("num1").value);
    const n2 = parseFloat(document.getElementById("num2").value);
    const n3 = parseFloat(document.getElementById("num3").value);

    // Verificamos que los tres campos tengan números válidos
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        alert("Por favor, introduce los tres números correctamente.");
        return;
    }

    // Llamamos a la función obtenerMayor y guardamos el resultado
    const mayor = obtenerMayor(n1, n2, n3);

    // Mostramos el resultado en el HTML
    document.getElementById("resultado").textContent =
        "El número más alto es: " + mayor;
}
