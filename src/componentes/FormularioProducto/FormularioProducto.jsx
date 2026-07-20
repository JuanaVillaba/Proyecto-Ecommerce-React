import React, { useState } from "react";
function FormularioProducto({datosForm, setDatosForm, manejarEnvio, setImagenFile, esEdicion}) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };
    return (
        <form style={formStyle} onSubmit={manejarEnvio}>
            <h3>{esEdicion? "Actualizar producto":"Agregar nuevo producto"}</h3>
            <div>
                <label>Nombre del producto:</label>
                <input type="text" placeholder="Ejemplo: Teclado Mecanico"
                name="nombre" value={datosForm.nombre}
                onChange={(e)=> setDatosForm({...datosForm, nombre: e.target.value})}/>
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" placeholder="Ejemplo: 15500"
                name="precio" value={datosForm.precio}
                onChange={(e)=> setDatosForm({...datosForm, precio: Number(e.target.value)})}/>
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" placeholder="Ejemplo: 100"
                name="stock" value={datosForm.stock}
                onChange={(e)=> setDatosForm({...datosForm, stock: Number(e.target.value)})}/>
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" 
                    accept="image/*" 
                    name="imagen" 
                    onChange={(e)=> setImagenFile(e.target.files[0])}/>
            </div>
            <button type="submit">{esEdicion? "Guardar producto actualizado":"Guardar producto"}</button>
        </form>
    );
}
export default FormularioProducto;