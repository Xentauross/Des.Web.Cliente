// Función que calcula un número entero aleatorio entre 1 y el valor 'max'.
// Fórmula: Multiplica el random (0 a 1) por el máximo, quita decimales, y suma 1.
const numeroAleatorio = (max) => Math.floor(Math.random() * max) + 1;

/**
 * Función principal: Obtiene el límite, valida y muestra el resultado.
 */
function generar() {
    // 1. Obtiene el texto del input "maximo" y lo convierte a NÚMERO ENTERO (parseInt).
    const max = parseInt(document.getElementById("maximo").value);
    // 2. Referencia al elemento donde se mostrará el texto.
    const resultado = document.getElementById("resultado");

    // 3. VALIDACIÓN: Comprueba si 'max' NO es un número (isNaN) o es menor que 1.
    if (isNaN(max) || max < 1) {
        // Muestra un error si la entrada es inválida.
        resultado.textContent = "Introduce un número válido (mayor que 0)";
    } else {
        // Muestra el resultado llamando a la función del número aleatorio.
        resultado.textContent = "Número aleatorio: " + numeroAleatorio(max);
    }
}
