// He separado la Vista usando funciones puras que retornan Template Strings. Esto hace que 
// el código sea predecible, fácil de testear y me permite cambiar el diseño HTML sin tocar ni una línea de la lógica de la API ni del Controlador

// Funcion para pintar la fila HTML esta no necesita el async proque es inmediato
// recibe el objeto producto
export function crearFilaProducto(producto) {

    // Nos asegurramos que el precio tenga siempre 2 decimales
    const precioFormateado = parseFloat(producto.precio).toFixed(2)

    // aqui como somos solo la vista no podemos poner addEventListener en los botones
    // solo colocamos una etiqueta invisible con el ID del producto y el main.js ya sabra que producto es
    return `
        <tr>
            <td>${producto.id}</td>
            <td><code>${producto.codigo}</code></td>
            <td>${producto.nombre}</td>
            <td>${producto.talla}</td>
            <td>${precioFormateado}</td>
            <td>${producto.email_creador}</td>
            <td>
            <button class="btn-editar" data-id="${producto.id}">Editar</button>
            <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
            </td>
        </tr>
        `
}