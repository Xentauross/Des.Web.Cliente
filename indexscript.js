//Esperaremos hasta que el documento esté cargado y listo para ser procesado por nuestro programa*/
let obj_documento = $(document)
/* Cuando esté cargado ejecutaremos La función cuyo nombre aparezca aqui*/
$(document).ready(function () {
    // Variables de secciones
    let secciones = $("main > section")
    let seccionInicio = $(".contenidoInicio")
    let seccion1 = $(".contenido1")
    let seccion2 = $(".contenido2")
    let seccion3 = $(".contenido3")
    let seccion4 = $(".contenido4")
    let seccion5 = $(".contenido5")
    let seccion6 = $(".contenido6")
    let seccion7 = $(".contenido7")
    let seccion8 = $(".contenido8")

    // Variables de menú
    let menu = $("#menu .menuTema")

    // Mostrar solo Inicio al cargar
    secciones.hide()
    seccionInicio.show()
    $("#inicio").addClass("activo")

    // Función para manejar los clics en el menú
    menu.click(function (e) {
        e.preventDefault()

        // Quitar clase activa a todos los botones
        menu.removeClass("activo")

        // Ocultar todo y agregar activo al botón actual
        secciones.hide()
        $(this).addClass("activo")

        // Mostrar sección correspondiente
        if (this.id === "inicio") {
            seccionInicio.fadeIn()
        } else if (this.id === "tema1") {
            seccion1.fadeIn()
        } else if (this.id === "tema2") {
            seccion2.fadeIn()
        } else if (this.id === "tema3") {
            seccion3.fadeIn()
        } else if (this.id === "tema4") {
            seccion4.fadeIn()
        } else if (this.id === "tema5") {
            seccion5.fadeIn()
        } else if (this.id === "tema6") {
            seccion6.fadeIn()
        } else if (this.id === "tema7") {
            seccion7.fadeIn()
        } else if (this.id === "tema8") {
            seccion8.fadeIn()
        }

    })
})
