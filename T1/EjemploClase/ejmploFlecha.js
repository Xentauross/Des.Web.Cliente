// Muy sencillo: escribe en consola y en #consoleOutput (si existe)
function log(x) { console.log(x); try { const o = document.getElementById('consoleOutput'); if (o) o.textContent += x + '\n'; } catch (e) { } }

let dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
log(dias.map(d => d.length));
let sumaDias = dias.reduce((a, e) => a + e.length, 0);
log(sumaDias);
