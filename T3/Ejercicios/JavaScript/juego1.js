let contraseña = "L4ultimavezKtelod1go";
let intento = document.getElementById("intputPlayer").value;
let intento2 = document.getElementById("intputPlayer2").value;
let intento3 = document.getElementById("intputPlayer3").value;


function comprobarContraseña() {
    let valor = intento.value;
    let valor2 = intento2.value;
    let valor3 = intento3.value;
    if (valor === contraseña || valor2 === contraseña || valor3 === contraseña) {
        alert("¡Contraseña correcta! Has ganado el juego.");
    } else {
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
    }
}

