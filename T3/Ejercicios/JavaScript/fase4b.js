// ------------------------------------------------------------
// FUNCIÓN: obtenerNombreMes(fecha)
// ------------------------------------------------------------
// Recibe un objeto Date y devuelve el nombre del mes correspondiente
function obtenerNombreMes(fecha) {
    // Array con los nombres de los meses (0 = enero, 11 = diciembre)
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Obtenemos el número del mes (de 0 a 11)
    const numeroMes = fecha.getMonth();

    // Devolvemos el nombre correspondiente
    return meses[numeroMes];
}

// ------------------------------------------------------------
// FUNCIÓN: mostrarMes()
// ------------------------------------------------------------
// Se ejecuta al pulsar el botón. Toma la fecha del input y muestra el nombre del mes.
function mostrarMes() {
    // Obtenemos el valor del input
    const valorInput = document.getElementById("fecha").value;
    // Validamos que se haya introducido una fecha
    if (valorInput === "") {
        alert("Por favor, selecciona una fecha.");
        return;
    }
    // Creamos un objeto Date con el valor introducido
    const fecha = new Date(valorInput);
    // Llamamos a la función que obtiene el nombre del mes
    const mesNombre = obtenerNombreMes(fecha);

    // Mostramos el resultado en el HTML
    document.getElementById("resultado").textContent = "El mes es: " + mesNombre;
}
