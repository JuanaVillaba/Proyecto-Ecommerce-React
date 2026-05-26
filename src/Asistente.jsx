import React from "react";
export function Asistente({nombre, tarea, emoji}) {
    return (
        <div>
            <h3>{nombre}</h3>
            <p>{tarea} {emoji}</p>
            
        </div>
    );
}
export default Asistente;