// Crear una piramide invertida
let asterisco = "*"
let espacio = " "

for (i = 5; i > 0; i--) {
    console.log(asterisco.repeat(i))

}


let dibujo

for (i = 5; i > 0; i--) {
    let aumento = 0
    dibujo = espacio.repeat(aumento) + asterisco.repeat(i)
    aumento++
    console.log(dibujo)
    console.log(aumento)

}

const asteriscos = "*";
const maximo = 5; // Definimos el tope para calcular los espacios

for (let i = maximo; i > 0; i--) {
    // Calculamos los espacios necesarios
    // La diferencia entre el máximo y el valor actual de i
    const espacios = " ".repeat(maximo - i);

    // Concatenamos espacios y asteriscos
    console.log(espacios + asteriscos.repeat(i));
}