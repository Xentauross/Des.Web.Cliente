const contraseña = "L4ultimavezKtelod1go";

function puntuar(palabra) {
    let puntos = 0;
    let aciertos = "";

    for (let letra of palabra) {
        if (contraseña.includes(letra)) {
            aciertos += letra;
            if ("aeiouAEIOU".includes(letra)) puntos += 1;
            else if ("0123456789".includes(letra)) puntos += 3;
            else puntos += 2;
        }
    }

    return `${puntos} puntos (aciertos: ${aciertos || "ninguno"})`;
}

document.getElementById("jugar").onclick = function () {
    let p1 = document.getElementById("p1").value;
    let p2 = document.getElementById("p2").value;
    let p3 = document.getElementById("p3").value;

    let r1 = puntuar(p1);
    let r2 = puntuar(p2);
    let r3 = puntuar(p3);

    document.getElementById("resultado").innerHTML =
        `Jugador 1: ${r1}<br>` +
        `Jugador 2: ${r2}<br>` +
        `Jugador 3: ${r3}`;
};
