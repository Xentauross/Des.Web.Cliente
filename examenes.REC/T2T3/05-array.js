let mixto = [10, "web", true, 30, "cliente", 20]

let numeros = []
for (let valor of mixto) {

    if (!isNaN(valor) && valor != true && valor != false)
        numeros.push(valor)
}

// Ordenado
numeros.sort()

// Muestra con guiones
console.log(numeros.join("-"))