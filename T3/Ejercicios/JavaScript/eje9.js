// 1. Variables para los elementos
const input = document.getElementById("input");
const boton = document.getElementById("mayuscula");
const resultado = document.getElementById("resultado");

// 2. Función para poner la primera letra de cada palabra en mayúscula
function ponerMayusculas() {
    // 2.1. Tomamos el texto del input
    const texto = input.value;

    // 2.2. Separamos las palabras por espacios
    const palabras = texto.split(" ");

    // 2.3. Recorremos cada palabra y ponemos la primera letra en mayúscula
    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
    }

    // 2.4. Unimos las palabras otra vez y lo mostramos
    resultado.textContent = palabras.join(" ");
}

// 3. Evento del botón
boton.addEventListener("click", ponerMayusculas);
