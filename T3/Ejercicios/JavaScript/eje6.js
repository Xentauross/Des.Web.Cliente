// 1. Obtener elementos del HTML
const input = document.getElementById("correoInput");
const boton = document.getElementById("guardar");
const salida = document.getElementById("correo");

// 2. Función que protege el correo electrónico
function protegerEmail(email) {
    // Verifica si el correo contiene el símbolo '@'.                   
    if (!email.includes("@")) {
        return "Correo inválido";
    }
    // Divide el correo en dos partes: antes y después del '@'.
    const [nombre, dominio] = email.split("@");
    // Toma solo los tres primeros caracteres del nombre (lo que se verá).       
    const visible = nombre.slice(0, 3);
    // Crea una cadena de cinco puntos "....." para ocultar parte del nombre.
    const oculto = ".".repeat(5);
    return `${visible}${oculto}@${dominio}`;
}

// 3. Detectar clic en el botón
// Escucha el evento 'click' en el botón y ejecuta el siguiente bloque.
boton.addEventListener("click", () => {
    // Obtiene el texto del input y elimina espacios extra al principio o al final.            
    const email = input.value.trim();
    // Llama a la función anterior para generar la versión protegida del correo.              
    const protegido = protegerEmail(email);
    // Muestra el correo protegido en la consola (para comprobar que funciona).        
    console.log(protegido);
    // Escribe el resultado dentro del elemento 'salida' en el HTML.              
    salida.textContent = "Correo protegido: " + protegido;
});


