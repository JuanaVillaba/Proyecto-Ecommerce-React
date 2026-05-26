import React from "react";
export function TarjetaUsuario({nombre, profesion}) {
    return (
        <div>
            <h2>{nombre}</h2>
            <p>{profesion}</p>
        </div>
    );
}
export default TarjetaUsuario;