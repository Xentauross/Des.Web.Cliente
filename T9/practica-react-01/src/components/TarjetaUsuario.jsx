// Definimos la función y recibimos el objeto 'props' como argumento
function UserCard(props) {

    const saludar = () => {
        alert(`Hola, soy ${props.nombre}`)
    }

    return (

        <div className="card">
            {/* Usamos llaves {} para meter variables de JavaScript en el HTML */}
            <img
                src={props.avatar}
                alt={props.nombre}
                style={{ width: '100px', borderRadius: '50%' }}
            />
            {/* Accedemos a las propiedades específicas que enviaremos luego */}
            <h2>{props.nombre}</h2>
            <p>Edad: {props.edad} años</p>
            <button onClick={saludar}>Saludar</button>
        </div>

    )
}

export default UserCard