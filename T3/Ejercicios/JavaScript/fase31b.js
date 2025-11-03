// Array donde se guardarán los elementos introducidos
let elementos = [];

// ------------------------------------------------------------
// FUNCIÓN: agregarElemento()
// ------------------------------------------------------------
function agregarElemento() {
    // Obtenemos el input donde se escribe el valor
    const input = document.getElementById("elemento");
    // Quitamos espacios en blanco al inicio y final
    const valor = input.value.trim();

    // Validamos que el valor no esté vacío
    if (valor !== "") {
        // Añadimos el valor al array
        elementos.push(valor);
        // Mostramos la lista actualizada en pantalla
        mostrarLista();
        // Limpiamos el campo de texto para el siguiente valor
        input.value = "";
    } else {
        // Avisamos si el input está vacío
        alert("Introduce un elemento válido");
    }
}

// ------------------------------------------------------------
// FUNCIÓN: mostrarLista()
// ------------------------------------------------------------
function mostrarLista() {
    // Mostramos el array en el HTML, separado por comas
    document.getElementById("lista").textContent =
        "Elementos actuales: " + elementos.join(", ");
}

// ------------------------------------------------------------
// FUNCIÓN: eliminarElemento()
// ------------------------------------------------------------
function eliminarElemento() {
    // Obtenemos el input del elemento a eliminar
    const input = document.getElementById("eliminar");
    // Quitamos espacios innecesarios
    const valor = input.value.trim();

    // Validamos que se haya introducido un valor
    if (valor === "") {
        alert("Introduce un valor para eliminar");
        // Salimos de la función si no hay valor
        return;
    }

    // Guardamos la longitud original para comprobar si se eliminó algo
    const originalLength = elementos.length;

    // Filtramos el array: creamos uno nuevo que NO contenga el valor a eliminar
    elementos = elementos.filter(item => item !== valor);

    // Comprobamos si se eliminó algún elemento
    if (elementos.length < originalLength) {
        document.getElementById("resultado").textContent = `Elemento "${valor}" eliminado.`;
    } else {
        document.getElementById("resultado").textContent = `Elemento "${valor}" no encontrado en el array.`;
    }
    // Actualizamos la lista en pantalla
    mostrarLista();
    // Limpiamos el input de eliminar
    input.value = "";
}
