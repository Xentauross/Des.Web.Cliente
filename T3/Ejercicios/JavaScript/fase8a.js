// ------------------------------------------------------------
// FUNCIÓN: calcularDiferencia()
// ------------------------------------------------------------
// Calcula la diferencia en días entre dos fechas seleccionadas por el usuario.
function calcularDiferencia() {
    const f1 = document.getElementById("fecha1").value;
    const f2 = document.getElementById("fecha2").value;

    // Verificamos que ambas fechas estén seleccionadas
    if (f1 === "" || f2 === "") {
        alert("Por favor, selecciona las dos fechas.");
        return;
    }

    // Convertimos las cadenas de texto en objetos Date
    const fecha1 = new Date(f1);
    const fecha2 = new Date(f2);

    // Calculamos la diferencia en milisegundos
    const diferenciaMs = Math.abs(fecha2 - fecha1);

    // Convertimos los milisegundos a días
    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    // Mostramos el resultado en el HTML
    document.getElementById("resultado").textContent =
        "La diferencia entre las dos fechas es de " + dias + " días.";
}
