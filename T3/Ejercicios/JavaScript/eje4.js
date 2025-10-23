let original = "JavaScript es un lenguaje de programación muy popular.";
let extraida = original.substring(6, 20);
document.getElementById("original").textContent = "Texto original: " + original;
document.getElementById("resultado").textContent = "Cadena extraída: " + extraida;