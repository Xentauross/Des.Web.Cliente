const numeroAleatorio = (max) => Math.floor(Math.random() * max) + 1;

function generar() {
    const max = parseInt(document.getElementById("maximo").value);
    const resultado = document.getElementById("resultado");

    if (isNaN(max) || max < 1) {
        resultado.textContent = "Introduce un número válido (mayor que 0)";
    } else {
        resultado.textContent = "Número aleatorio: " + numeroAleatorio(max);
    }
}
