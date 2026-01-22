let entrada = ["casa", "revolucion", "sol", "elefante", "luz", "teclado"];

let array = []

for (let valor of entrada) {
    if (valor.length > 5)
        array.push(valor.toUpperCase())
}


console.log(array)