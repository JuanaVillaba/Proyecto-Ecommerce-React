import React from "react";
import styles from "./Inicio.module.css";
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import {ItemList} from "../ItemList/Itemlist";

function Inicio() {
    const productos = [
{ id: '6', nombre: 'Notebook Pro', precio: 12000, stock: 15 },
{ id: '4', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
{ id: '7', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },];
    return (
        <div className={styles.fondo}>
            <h1>Bienvenidos a la Página de Inicio</h1>
            <p>Comienza a escribir tu nuevo código aquí...</p>
            <ItemList productos={productos} />

        </div>
    )
}

export default Inicio;