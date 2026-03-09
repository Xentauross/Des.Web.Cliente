import { useState } from 'react'

function Contador() {

    const [cuenta, setCuenta] = useState(0)

    const aumentar = () => {
        setCuenta(cuenta + 1)
    }

    const disminuir = () => {
        if (cuenta > 0)
            setCuenta(cuenta - 1)
        else
            return alert("El número no puede ser negativo")
    }
    return (
        <div className="contador-caja">
            <h2>Mi Contador React</h2>
            <button onClick={aumentar} className="mas">Aumentar</button>
            <h1>{cuenta}</h1>
            <button onClick={disminuir} className="menos">Disminuir</button>
        </div>
    )
}

export default Contador