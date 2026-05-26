import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Productos({ Mensaje }) {
    const [listaProductos, setListaproductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch("/data/productos.json")
            .then(response => response.json())
            .then(data => {
                setListaproductos(data);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error de carga: ", error);
                setCargando(false);
            })
    }, []);
    if (cargando) {
        return <h2>Cargando catalogo de productos...</h2>
    }
    return (
        <div>
            <h1>{Mensaje}</h1>
            <ul>
                {listaProductos.map((producto) => (
                    <li key={producto.id}>
                        <Link to={`/productos/${producto.id}`}>
                            <h2>{producto.nombre}</h2>
                            <img src={producto.imagen} alt={producto.nombre}
                                width="150" height="150" />
                            <p>Precio: ${producto.precio}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Productos;