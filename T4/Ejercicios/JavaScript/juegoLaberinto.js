function resolverLaberintoSimple(lab, x, y, visitado) {
    const alto = lab.length;
    const ancho = lab[0].length;

    // A. ¿DEBO DETENERME? (CASOS BASE - PARADA)

    // 1. Caso de Parada: Fuera de límites, pared ('X'), o ya visité aquí (callejón sin salida)
    if (x < 0 || y < 0 || x >= alto || y >= ancho || lab[x][y] === 'X' || visitado[x][y]) {
        return false; // NO hay salida desde aquí.
    }

    // 2. Caso de Parada: ¡ÉXITO! ¡Encontré la 'F'!
    if (lab[x][y] === 'F') {
        return true; // ¡SÍ hay salida!
    }

    // B. SEGUIR AVANZANDO (PASO RECURSIVO)

    // Marco mi posición actual como visitada
    visitado[x][y] = true;

    // Pruebo mis 4 direcciones y pregunto: "¿Hay salida desde alguna de estas?"
    const derecha = resolverLaberintoSimple(lab, x, y + 1, visitado);
    if (derecha) return true; // Si el camino de DERECHA funciona, devuelvo TRUE.

    const abajo = resolverLaberintoSimple(lab, x + 1, y, visitado);
    if (abajo) return true; // Si el camino de ABAJO funciona, devuelvo TRUE.

    const izquierda = resolverLaberintoSimple(lab, x, y - 1, visitado);
    if (izquierda) return true; // Si el camino de IZQUIERDA funciona, devuelvo TRUE.

    const arriba = resolverLaberintoSimple(lab, x - 1, y, visitado);
    if (arriba) return true; // Si el camino de ARRIBA funciona, devuelvo TRUE.

    // C. FRACASO DESDE ESTA POSICIÓN
    // Si llego aquí, significa que las 4 llamadas de mis 4 direcciones regresaron 'false'.
    // Entonces, esta posición es un callejón sin salida.
    return false;
}