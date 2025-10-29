// Función que cuenta cuántas veces aparece una subcadena dentro de un texto
function contarSubcadena(texto, subcadena) {
    // Inicializa un contador en 0
    let contador = 0;
    // Busca la primera aparición de la subcadena                
    let pos = texto.indexOf(subcadena);

    // Mientras la subcadena siga apareciendo en el texto
    while (pos !== -1) {
        // Aumenta el contador
        contador++;
        // Busca la siguiente aparición a partir del final de la anterior                              
        pos = texto.indexOf(subcadena, pos + subcadena.length);
    }
    // Devuelve el total de apariciones encontradas
    return contador;
}

// Texto de ejemplo donde buscar
const texto = 'Estamos haciendo ejercicios de JavaScript, y más ejercicios.';

// Subcadena que queremos contar
const subcadena = 'ejercicios';

// Llamamos a la función y guardamos el resultado
const veces = contarSubcadena(texto, subcadena);

// Mostramos el texto original en un elemento con id="texto"
document.getElementById('texto').textContent = texto;

// Mostramos el resultado en un elemento con id="resultado"
document.getElementById('resultado').textContent = `La palabra "${subcadena}" aparece ${veces} veces en el texto.`;