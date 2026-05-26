import React from "react";
import styles from "./TarjetaProducto.module.css";
export function TarjetaProducto({imagen, nombre, precio}) {
    
    return (
        <div className={styles.orden}>
            <img className={styles.imagen} src={imagen}/>
            <p className={styles.nombre}>{nombre}</p>
            <p className={styles.precio}>{precio}</p>
        </div>
    );
}
export default TarjetaProducto;