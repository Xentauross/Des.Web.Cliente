// ════════════════════════════════════════════
//  CONFIGURACIÓN
// ════════════════════════════════════════════

const API = "api.php";
const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"];
const CAMPOS = ["codigo", "nombre", "talla", "precio", "email_creador"];

// ════════════════════════════════════════════
//  REFERENCIAS AL DOM
// ════════════════════════════════════════════

const form = document.getElementById("form-producto");
const inputId = document.getElementById("producto-id");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const tbody = document.getElementById("tbody");
const totalSpan = document.getElementById("total");
const sinDatos = document.getElementById("sin-datos");
const cargando = document.getElementById("cargando");
const divMensaje = document.getElementById("mensaje");

// ════════════════════════════════════════════
//  EVENTOS
// ════════════════════════════════════════════

// Al cargar la página, traemos los productos
document.addEventListener("DOMContentLoaded", cargarProductos);

// Submit del formulario → crear o actualizar
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 1. Leer datos
    const datos = leerFormulario();

    // 2. Validar
    const errores = validar(datos);
    limpiarErrores();

    if (Object.keys(errores).length > 0) {
        mostrarErroresValidacion(errores);
        return;
    }

    // 3. Enviar (crear o actualizar)
    try {
        let resultado;

        if (datos.id) {
            resultado = await peticion(API, "PUT", datos);
        } else {
            resultado = await peticion(API, "POST", datos);
        }

        mostrarMensaje(resultado.message, "exito");
        limpiarFormulario();
        await cargarProductos();

    } catch (error) {
        mostrarMensaje(error.message, "error-msg");
    }
});

// Botón cancelar → limpiar formulario
btnCancelar.addEventListener("click", limpiarFormulario);

// ════════════════════════════════════════════
//  CRUD — FUNCIONES ASÍNCRONAS
// ════════════════════════════════════════════

/**
 * READ — Carga todos los productos y los pinta en la tabla
 */
async function cargarProductos() {
    cargando.style.display = "block";
    sinDatos.style.display = "none";
    tbody.innerHTML = "";

    try {
        const productos = await peticion(API, "GET");

        totalSpan.textContent = "(" + productos.length + ")";

        if (productos.length === 0) {
            sinDatos.style.display = "block";
            return;
        }

        // Recorremos y creamos cada fila
        productos.forEach(function (p) {
            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + p.id + "</td>" +
                "<td><code>" + p.codigo + "</code></td>" +
                "<td>" + p.nombre + "</td>" +
                "<td>" + p.talla + "</td>" +
                "<td>" + parseFloat(p.precio).toFixed(2) + " €</td>" +
                "<td>" + p.email_creador + "</td>" +
                '<td>' +
                '<button class="btn-editar">Editar</button>' +
                '<button class="btn-eliminar">Eliminar</button>' +
                '</td>';

            // Evento editar
            fila.querySelector(".btn-editar").addEventListener("click", function () {
                editarProducto(p);
            });

            // Evento eliminar
            fila.querySelector(".btn-eliminar").addEventListener("click", function () {
                eliminarProducto(p.id);
            });

            tbody.appendChild(fila);
        });

    } catch (error) {
        mostrarMensaje("Error al cargar: " + error.message, "error-msg");
    } finally {
        cargando.style.display = "none";
    }
}

/**
 * UPDATE (preparar) — Rellena el formulario con los datos del producto
 */
function editarProducto(producto) {
    inputId.value = producto.id;
    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("talla").value = producto.talla;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("email_creador").value = producto.email_creador;

    btnGuardar.textContent = "Actualizar";
    btnCancelar.style.display = "inline-block";

    // Subir al formulario
    form.scrollIntoView({ behavior: "smooth" });
}

/**
 * DELETE — Elimina un producto previa confirmación
 */
async function eliminarProducto(id) {
    var confirmar = confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
        var resultado = await peticion(API, "DELETE", { id: id });
        mostrarMensaje(resultado.message, "exito");

        // Si estábamos editando ese producto, limpiar formulario
        if (parseInt(inputId.value) === id) {
            limpiarFormulario();
        }

        await cargarProductos();

    } catch (error) {
        mostrarMensaje("Error al eliminar: " + error.message, "error-msg");
    }
}

// ════════════════════════════════════════════
//  PETICIÓN GENÉRICA CON FETCH
// ════════════════════════════════════════════

/**
 * Función genérica para hacer peticiones a la API
 * 
 * @param {string} url    — URL del endpoint
 * @param {string} method — GET, POST, PUT, DELETE
 * @param {Object} body   — Datos a enviar (opcional)
 * @returns {Promise<Object>} — Respuesta JSON
 */
async function peticion(url, method, body) {
    var opciones = {
        method: method,
        headers: { "Content-Type": "application/json" }
    };

    // GET no lleva body
    if (body && method !== "GET") {
        opciones.body = JSON.stringify(body);
    }

    var response = await fetch(url, opciones);
    var data = await response.json();

    // Si hay error del servidor, lanzamos excepción
    if (!response.ok) {
        throw new Error(data.error || "Error del servidor");
    }

    return data;
}

// ════════════════════════════════════════════
//  VALIDACIÓN DEL FORMULARIO
// ════════════════════════════════════════════

/**
 * Valida todos los campos y devuelve un objeto con los errores
 * 
 * @param {Object} datos — Datos del formulario
 * @returns {Object} — { campo: "mensaje de error" } (vacío si todo ok)
 */
function validar(datos) {
    var errores = {};

    // Código: obligatorio, exactamente 9 caracteres alfanuméricos
    if (!datos.codigo || datos.codigo.trim() === "") {
        errores.codigo = "El código es obligatorio";
    } else if (datos.codigo.length !== 9) {
        errores.codigo = "Debe tener exactamente 9 caracteres (tiene " + datos.codigo.length + ")";
    } else if (!/^[a-zA-Z0-9]{9}$/.test(datos.codigo)) {
        errores.codigo = "Solo letras y números";
    }

    // Nombre: obligatorio
    if (!datos.nombre || datos.nombre.trim() === "") {
        errores.nombre = "El nombre es obligatorio";
    } else if (datos.nombre.length > 100) {
        errores.nombre = "Máximo 100 caracteres";
    }

    // Talla: debe ser válida
    if (!datos.talla || datos.talla === "") {
        errores.talla = "Selecciona una talla";
    } else if (TALLAS.indexOf(datos.talla.toUpperCase()) === -1) {
        errores.talla = "Talla no válida";
    }

    // Precio: número mayor que 0
    if (datos.precio === "" || datos.precio === null) {
        errores.precio = "El precio es obligatorio";
    } else if (isNaN(parseFloat(datos.precio)) || parseFloat(datos.precio) <= 0) {
        errores.precio = "Debe ser un número mayor que 0";
    }

    // Email: formato válido
    if (!datos.email_creador || datos.email_creador.trim() === "") {
        errores.email_creador = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email_creador)) {
        errores.email_creador = "Formato de email no válido";
    }

    return errores;
}

// ════════════════════════════════════════════
//  FUNCIONES DE UTILIDAD (DOM)
// ════════════════════════════════════════════

/**
 * Lee los valores del formulario y los devuelve como objeto
 */
function leerFormulario() {
    return {
        id: inputId.value || null,
        codigo: document.getElementById("codigo").value.trim(),
        nombre: document.getElementById("nombre").value.trim(),
        talla: document.getElementById("talla").value,
        precio: document.getElementById("precio").value,
        email_creador: document.getElementById("email_creador").value.trim()
    };
}

/**
 * Limpia el formulario y vuelve al modo "crear"
 */
function limpiarFormulario() {
    form.reset();
    inputId.value = "";
    btnGuardar.textContent = "Guardar";
    btnCancelar.style.display = "none";
    limpiarErrores();
}

/**
 * Muestra los mensajes de error debajo de cada campo
 */
function mostrarErroresValidacion(errores) {
    // Recorremos cada campo con error
    for (var campo in errores) {
        var input = document.getElementById(campo);
        var span = document.getElementById("error-" + campo);

        if (input) input.classList.add("invalido");
        if (span) span.textContent = errores[campo];
    }
}

/**
 * Limpia todos los errores del formulario
 */
function limpiarErrores() {
    CAMPOS.forEach(function (campo) {
        var input = document.getElementById(campo);
        var span = document.getElementById("error-" + campo);

        if (input) input.classList.remove("invalido");
        if (span) span.textContent = "";
    });
}

/**
 * Muestra un mensaje de éxito o error durante 3 segundos
 * 
 * @param {string} texto — Texto del mensaje
 * @param {string} tipo  — "exito" o "error-msg"
 */
function mostrarMensaje(texto, tipo) {
    divMensaje.textContent = texto;
    divMensaje.className = "mensaje " + tipo;
    divMensaje.style.display = "block";

    // Ocultar automáticamente a los 3 segundos
    setTimeout(function () {
        divMensaje.style.display = "none";
    }, 3000);
}