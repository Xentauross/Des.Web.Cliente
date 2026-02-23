// Guardamos la ruta del servidor
const API_URL = "server.php"

// Creamos la funcion para obtener los productos con export conseguimos que esta funcion la podamos usar en el main.js
// es asincrona por que nos estamos comunicando con el servidor y tarda unos milisegundos asi la web no se bloquea
export async function obtenerProductos() {

    try {
        // Con fetch hacemos la peticion al servidor de GET 
        // Con el await obligamos a js a pausar la ejecucion hasta el servidor responda.
        const respuesta = await fetch(API_URL)

        // fetch no considera un error si el servidor devuelve un error 404 o 500, solo falla si no hay conexion
        // por eso hay que comprobarlo manualmente si el estado de la respuesta fue OK
        if (!respuesta.ok) {
            // sino fue OK lazamos el error para que el bloque catch lo atrape
            throw new Error("Error en la red o servidor caído")
        }

        // Como el servidor devuelve un texto plano en formato JSON, esta funcion lo traduce y lo convierte
        // en un array de objetos js para poder manejarlo
        const datos = await respuesta.json()

        // Lo devolvemos
        return datos

    } catch (error) {
        console.error("Error en obtenerProductos; ", error)

        // Lanzamos el error de nuevo para el main.js se entere de que ha habido un fallo para 
        // poder mostrarle un mensaje al usuario por pantalla
        throw error
    }
}

// importante le pasamos como parametro producto porque será el objeto de js con los datos del formulario
export async function crearProducto(producto) {

    try {

        // Aqui nos comunicamos con el servidor y le pasamos el objeto
        const respuesta = await fetch(API_URL, {
            // Le decimos al server que esto es un POST 
            method: "POST",
            // Esto es la cabezera de nuestro paquete con el que le decimos
            // que el contenido que se envia es JSON
            headers: {
                "Content-Type": "application/json"
            },
            // Aqui mandamos los datos reales del mensaje
            // la funcion convierte el objeto a cadena de texto formato JSON para que se pueda enviar
            body: JSON.stringify(producto)
        })

        // Volvemos a traducir la respuesta del servidor
        const datos = await respuesta.json()
        // Manejamos si existe algun error
        if (!respuesta.ok) {
            throw new Error(data.error || "Error al crear el producto")
        }

        return datos
        //Atrapamos cualquier error y los parsamos al controlado main.js
    } catch (error) {
        console.error("Erro en crearProducto: ", error)
        throw error
    }
}


// Con esta funcion conseguimos actualizar el producto que queramos
export async function actualizarProducto(producto) {
    try {

        // Aqui nos comunicamos con el servidor y le pasamos el objeto
        const respuesta = await fetch(API_URL, {
            // Le decimos al server que esto es un PUT que significa que ya esta
            // creado y lo queremos modificar
            method: "PUT",
            // Esto es la cabezera de nuestro paquete con el que le decimos
            // que el contenido que se envia es JSON
            headers: {
                "Content-Type": "application/json"
            },
            // Aqui mandamos los datos reales del mensaje
            // la funcion convierte el objeto a cadena de texto formato JSON para que se pueda enviar
            body: JSON.stringify(producto)
        })

        // Volvemos a traducir la respuesta del servidor
        const datos = await respuesta.json()
        // Manejamos si existe algun error
        if (!respuesta.ok) {
            throw new Error(data.error || "Error al actualizar el producto")
        }

        return datos
        //Atrapamos cualquier error y los parsamos al controlado main.js
    } catch (error) {
        console.error("Erro en actualizarProducto: ", error)
        throw error
    }
}

// Con esta funcion podemos eliminar el producto que queramos, aqui se pasar el parametro
// id porque necesitamos la identidad unica del producto
export async function eliminarProducto(id) {
    try {

        // Aqui nos comunicamos con el servidor y le pasamos el objeto
        const respuesta = await fetch(API_URL, {
            // Le decimos al server que esto es un DELETE que vamos a borra un producto
            method: "DELETE",
            // Esto es la cabezera de nuestro paquete con el que le decimos
            // que el contenido que se envia es JSON
            headers: {
                "Content-Type": "application/json"
            },
            // Aqui solo le llega un numero pero esta esperando recibir un objeto
            // asi que construimos uno rapido calve:valor y lo pasamos a cadena de texto
            body: JSON.stringify({ id: id })
        })

        // Volvemos a traducir la respuesta del servidor
        const datos = await respuesta.json()
        // Manejamos si existe algun error
        if (!respuesta.ok) {
            throw new Error(data.error || "Error al eliminar el producto")
        }

        return datos
        //Atrapamos cualquier error y los parsamos al controlado main.js
    } catch (error) {
        console.error("Erro en eliminarProducto: ", error)
        throw error
    }
}