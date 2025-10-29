// Función que busca cuántas veces aparece una palabra dentro de un texto
function palabra_busqueda(texto, palabra) {
    // Variable que cuenta cuántas veces aparece la palabra
    let contador = 0;
    // Busca la primera posición donde aparece la palabra         
    let pos = texto.indexOf(palabra);

    // Mientras la palabra se siga encontrando en el texto...
    while (pos !== -1) {
        // Aumenta el contador
        contador++;
        // Busca la siguiente aparición desde el final de la anterior                           
        pos = texto.indexOf(palabra, pos + palabra.length);
    }

    // Devuelve un mensaje con el resultado
    return `'${palabra}' se encontró ${contador} veces.`;
}

// Ejemplos de frases donde buscaremos las palabras
const fr1 = "El zorro marrón zorro mamón";
const fr2 = "aa, bb, aa";

// Llamamos a la función con cada frase y palabra a buscar
const r1 = palabra_busqueda(fr1, 'zorro');
const r2 = palabra_busqueda(fr2, 'aa');

// Mostramos las frases originales en el HTML
document.getElementById('palabra1').textContent = fr1;
document.getElementById('palabra2').textContent = fr2;

// Mostramos los resultados generados por la función en el HTML
document.getElementById('resultado1').textContent = r1;
document.getElementById('resultado2').textContent = r2;
