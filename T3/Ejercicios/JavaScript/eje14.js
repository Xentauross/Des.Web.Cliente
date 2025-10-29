function insert(str, toInsert = '', pos = 1) {
    // Si la posición es menor que 1, la ajustamos al principio
    if (pos < 1) pos = 1;

    // Convertimos a índice (empieza en 0)
    let index = pos - 1;

    // Insertamos la cadena
    return str.slice(0, index) + toInsert + ' ' + str.slice(index);
}

// Ejemplos de uso:
let res1 = insert('Estamos haciendo ejercicios.');
let res2 = insert('Estamos haciendo ejercicios.', 'JavaScript');
let res3 = insert('Estamos haciendo algunos ejercicios.', ' de JavaScript', 5);

// Mostramos los resultados en pantalla
document.getElementById('resultado1').textContent = res1;
document.getElementById('resultado2').textContent = res2;
document.getElementById('resultado3').textContent = res3;