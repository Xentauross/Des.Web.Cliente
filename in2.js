//Esperaremos hasta que el documento esté cargado y listo para ser procesado por nuestro programa*/
$(document).ready(function () {
    // Si usas el tab system de Bootstrap, esta lógica ya no es estrictamente necesaria para mostrar/ocultar.
    // Bootstrap maneja automáticamente el 'active' y el 'show'/'hide' de las pestañas (tab-pane).

    // Puedes usar esto si necesitas ejecutar algo cuando una pestaña se muestra.
    let menuTabs = new bootstrap.Tab(document.getElementById('inicio-tab'));

    // Función para manejar el clic si deseas un comportamiento adicional.
    $(".menuTema").on('click', function (e) {
        // e.preventDefault() ya no es necesario si usas el data-bs-toggle="tab"

        // Ejemplo de cómo acceder al tab content si fuera necesario
        let targetId = $(this).attr('data-bs-target');
        console.log("Se hizo click en la pestaña con ID: " + targetId);
    });

    // Nota: El siguiente código de ocultar/mostrar secciones se vuelve redundante con Bootstrap Tabs.
    /*
    let secciones = $("main > section")
    let seccionInicio = $("#inicio-content")
    let seccion1 = $("#tema1-content")
    // ... y el resto de secciones

    // Al cargar, Bootstrap se encarga de que la pestaña con 'active' se muestre.
    // secciones.hide()
    // seccionInicio.show()
    // $("#inicio-tab").addClass("active") // Ya lo hace el HTML y Bootstrap.
    */
});