// n1 y n2 son variables para guardar los números que vamos a operar.
let n1 = 0;
let n2 = 0;
/**
 * Función que suma los valores de los campos de texto.
 */
const sumar = () => {
    // Esencial: Convertimos el texto (del HTML) a un número decimal (float) con parseFloat().
    n1 = parseFloat(document.getElementById("n1").value);
    n2 = parseFloat(document.getElementById("n2").value);
    const resultado = document.getElementById("resultado");
    // Mostramos la suma.
    resultado.textContent = "Resultado: " + (n1 + n2);
}
/**
 * Función que resta los valores de los campos de texto.
 */
const restar = () => {
    // Usamos parseFloat() para que la operación sea matemática y no de texto.
    n1 = parseFloat(document.getElementById("n1").value);
    n2 = parseFloat(document.getElementById("n2").value);
    const resultado = document.getElementById("resultado");
    // Mostramos la resta.
    resultado.textContent = "Resultado: " + (n1 - n2);
}
/**
 * Función que multiplica los valores de los campos de texto.
 */
const multiplicar = () => {
    // Conversión de string a número decimal.
    n1 = parseFloat(document.getElementById("n1").value);
    n2 = parseFloat(document.getElementById("n2").value);
    const resultado = document.getElementById("resultado");
    // Mostramos la multiplicación.
    resultado.textContent = "Resultado: " + (n1 * n2);
}
/**
 * Función que divide los valores de los campos de texto.
 */
const dividir = () => {
    // Conversión de string a número decimal.
    n1 = parseFloat(document.getElementById("n1").value);
    n2 = parseFloat(document.getElementById("n2").value);
    const resultado = document.getElementById("resultado");
    // Controlamos el caso especial: No se puede dividir por cero.
    if (n2 === 0) {
        resultado.textContent = "Error: División por cero";
    } else {
        // Mostramos la división.
        resultado.textContent = "Resultado: " + (n1 / n2);
    }
}
