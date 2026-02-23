// Primero importamos todas las funciones anteriores 
import { obtenerProductos, eliminarProducto, crearProducto, actualizarProducto } from './api.js'
import { crearFilaProducto } from './components.js'


// Ahora creamos las referencias al DOM
const tbody = document.getElementById("tbody")
const cargando = document.getElementById("cargando")
const sinDatos = document.getElementById("sin-datos")
const totalSpan = document.getElementById("total")
const divMensaje = document.getElementById("mensaje")

// Fucion que que pide los datos al mensajero y se los da al molde para pintar la tabla
// deve de ser async ya que puede tardar la repuesta en llegar
async function cargarProductos() {

    // Aqui preparamos la pantalla antes que hagamos la peticion
    // Mostramos el texto cargando..
    cargando.style.display = "block"
    // Ocultamos el texto
    sinDatos.style.display = "none"
    // Vaciamos el contenido de la tabla
    tbody.innerHTML = ""

    try {
        // Guardamos en una constate lo que nos llega de nuestra funcion creada en el api
        const productos = await obtenerProductos()

        //Actualizamos el numoer que sale al lado del titulo LIsta de productos con .length
        totalSpan.textContent = `(${productos.length})`

        // Si está vacia la base de datos la longitud del array será 0
        if (productos.length === 0) {
            // Mostramos el mensaje "No hay productos registrados"
            sinDatos.style.display = "block"
            // Esto actua de freno para que no lea más
            return
        }

        // Creamos la variable porque aqui va han ir pegando todas la filas de HTML que nos genere
        // Se usa let para que pueda variar el valor y pueda ser más grande
        let htmlFilas = ""

        // Cojemos el array de los productos y lo recorremos uno a uno
        productos.forEach(producto => {
            // aqui usamos la funcion del components le pasamos el objeto producto y nos los devuelve en forma de texto con la forma
            // que le di en la fucion y se lo sumamos a la variable que creamos para crear la tabla
            htmlFilas += crearFilaProducto(producto)
        })

        // Aqui pasamos ya todo el HTML construido en la memoria para pintarlo de una vez
        tbody.innerHTML = htmlFilas

        //Fucnion que hace que lo botones funcionen
        asignarEventosBotones(productos)

        // Si falla el obtenerProductos() el codigo salta hasta aqui y muestra el mensaje de error
    } catch (error) {
        mostrarMensaje("Error al cargar: " + error.message, "error-msg")

        // Esto lo que hace que si fue bien o mal que oculte el mensaje "Cargando..."
    } finally {
        cargando.style.display = "none"
    }
}


// Le pasamos la lista de todos los productos como parametro porque necesita buscar en la lista los datos completos de ese producto
function asignarEventosBotones(productos) {

    // Esto hace como un escaner de todo el HTML y obtiene cualquier elemento con esta clase
    const botonesEliminar = document.querySelectorAll(".btn-eliminar")

    // Aqui hacemos varios pasos
    // Primero recorremos todos los botones con el bucle forEach
    // Segundo le decimos a cada boton que este atento a un click
    // Tercero con dataset.id leemos la etiqueta invisible que pusimos en el components.js para saber el numero de ID exacto para borrar y lo parseamos a Int para asegurar
    // que es un número no un texto
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.dataset.id)
            // Llamamos a otra función de nuestro main.js encargada de preguntarle al usuario "¿Estás seguro?" y hablar con el mensajero
            borrarProducto(id)
        })
    })

    const botonesEditar = document.querySelectorAll(".btn-editar")

    botonesEditar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.dataset.id)

            // Con el .find() buscamos en la lista de productos que el id coincida exactamente con el id del boton
            const productoAEditar = productos.find(p => p.id === id)
            // Le pasamos el objeto completo a una funcion para que coja esos datos y los escriba en el formulario
            prepararFormularioParaEditar(productoAEditar)
        })
    })
}

// funcion para borrar el producto de la bd
async function borrarProducto(id) {

    // abre una ventanita para que confirme la elminiacion, si confirma sigue
    const confirmar = confirm("¿Seguro que quieres eliminar este producto?")
    if (!confirmar) return

    try {
        // Usamos la funcion creada anteriormente
        const resultado = await eliminarProducto(id)

        //Llamamos a una funcion de ayuda para pintar un cartelito que diga "Producto Eliminado"
        mostrarMensaje(resultado.message, "exito")

        // Recargamos la tabla de nuevo 
        await cargarProductos()

    } catch (error) {
        mostrarMensaje("Error al eliminar: " + error.message, "error-msg");
    }
}

// Recibe el objeto completo que lo buscamos antes con el find()
function prepararFormularioParaEditar(producto) {

    // Lee el campo oculto con el hidden con el id y mira si el cuado esta lleno sabe que tiene que hacer PUT y si esta vacio tiene que hacer POST
    document.getElementById("producto-id").value = producto.id

    // Buscamos cada cajita por su id y metemos el valor correpondiente al producto
    document.getElementById("codigo").value = producto.codigo
    document.getElementById("nombre").value = producto.nombre
    document.getElementById("talla").value = producto.talla
    document.getElementById("precio").value = producto.precio
    document.getElementById("email_creador").value = producto.email_creador

    // Cambiomos el texto del boton de guardar a actualizar para que el usuario entienda que esta haciendo
    // ademas mostramos un boton de cancelar por si no quiere editar
    const btnGuardar = document.getElementById("btn-guardar")
    const btnCancelar = document.getElementById("btn-cancelar")

    btnGuardar.textContent = "Actualizar"
    btnCancelar.style.display = "inline-block"

    // Esto hace que la pantalla haga un scroll suave y automático hacia arriba, justo hasta donde está el formulario.
    document.getElementById("form-producto").scrollIntoView({ behavior: "smooth" })
}

// Buscmoas en el formulario entero el sumbit para ver que hace
const form = document.getElementById("form-producto")


form.addEventListener("submit", async (e) => {
    // Hace que la pagina no se recargue cuando envias el formulario
    e.preventDefault()
    // aqui vamos leyendo todos los datos del formulario
    const datos = leerFormulario()

    const errores = validar(datos)
    // Borramos los mensajes de error rojos de intentos anteriores
    limpiarErrores()

    //Comprobamos si el código tiene 9 letras, si el precio es mayor que 0, etc
    if (Object.keys(errores).length > 0) {
        // Si el objeto errores tiene algo dentro, mostramos los textos en rojo bajo los inputs y hacemos un return para abortar el envío
        mostrarErroresValidacion(errores)
        return
    }
    try {
        let resultado

        if (datos.id) {
            // Si el input oculto TIENE un número, significa que estamos EDITANDO
            resultado = await actualizarProducto(datos)
        } else {
            // Si el input oculto está VACÍO, significa que estamos CREANDO uno nuevo
            resultado = await crearProducto(datos)
        }

        mostrarMensaje(resultado.message, "exito")
        // Vaciamos las cajitas del formulario
        limpiarFormulario()

        // Volvemos a pintar la tabla con los datos frescos
        await cargarProductos()
    } catch (error) {
        mostrarMensaje(error.message, "error-msg");
    }
})

// ==========================================
// FUNCIONES AYUDANTES 
// ==========================================

// Leer datos de las cajitas
function leerFormulario() {
    return {
        // El campo oculto
        id: document.getElementById("producto-id").value || null,
        codigo: document.getElementById("codigo").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        talla: document.getElementById("talla").value,
        precio: document.getElementById("precio").value,
        email_creador: document.getElementById("email_creador").value.trim()
    }
}

// Validar que los datos tengan sentido
function validar(datos) {
    const errores = {};
    const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"]

    if (!datos.codigo || datos.codigo.length !== 9 || !/^[a-zA-Z0-9]{9}$/.test(datos.codigo)) {
        errores.codigo = "Exactamente 9 caracteres alfanuméricos"
    }
    if (!datos.nombre) {
        errores.nombre = "El nombre es obligatorio"
    }
    if (!datos.talla || !TALLAS.includes(datos.talla.toUpperCase())) {
        errores.talla = "Selecciona una talla válida"
    }
    if (!datos.precio || isNaN(datos.precio) || parseFloat(datos.precio) <= 0) {
        errores.precio = "El precio debe ser un número mayor que 0"
    }
    if (!datos.email_creador || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email_creador)) {
        errores.email_creador = "Formato de email no válido"
    }

    return errores
}

// Pintar los errores en rojo bajo los inputs
function mostrarErroresValidacion(errores) {
    for (let campo in errores) {
        const input = document.getElementById(campo)
        // Usamos template literals
        const span = document.getElementById(`error-${campo}`)
        if (input) input.classList.add("invalido")
        if (span) span.textContent = errores[campo]
    }
}

// Limpiar los textos rojos cuando el usuario lo vuelve a intentar
function limpiarErrores() {
    const campos = ["codigo", "nombre", "talla", "precio", "email_creador"]
    campos.forEach(campo => {
        const input = document.getElementById(campo)
        const span = document.getElementById(`error-${campo}`)
        if (input) input.classList.remove("invalido")
        if (span) span.textContent = ""
    });
}

// Dejar el formulario como nuevo después de guardar o cancelar
function limpiarFormulario() {
    const form = document.getElementById("form-producto")
    // Vacia todos los inputs visibles
    form.reset()
    // ¡Vacia el ID oculto!
    document.getElementById("producto-id").value = ""
    // Restaura el botón azul
    document.getElementById("btn-guardar").textContent = "Guardar"
    // Esconde el botón gris
    document.getElementById("btn-cancelar").style.display = "none"
    limpiarErrores();
}

// Mostrar el cartelito flotante verde o rojo
function mostrarMensaje(texto, tipo) {
    divMensaje.textContent = texto
    // "mensaje exito" o "mensaje error-msg"
    divMensaje.className = `mensaje ${tipo}`
    divMensaje.style.display = "block"

    // Un temporizador que a los 3 segundos (3000 ms) oculta el cartel
    setTimeout(() => {
        divMensaje.style.display = "none"
    }, 3000)
}

// Evento para el botón de Cancelar que estaba escondido
document.getElementById("btn-cancelar").addEventListener("click", limpiarFormulario)

// LLama a la carga de productos
document.addEventListener("DOMContentLoaded", cargarProductos)