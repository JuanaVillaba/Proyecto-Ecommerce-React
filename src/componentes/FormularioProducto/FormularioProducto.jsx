import React, { useState } from "react";
function FormularioProducto({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen}) {
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
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del producto:</label>
                <input type="text" placeholder="Ejemplo: Teclado Mecanico"
                name="nombre" value={datosForm.nombre} onChange={manejarCambio}/>
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" placeholder="Ejemplo: 15500"
                name="precio" value={datosForm.precio} onChange={manejarCambio}/>
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" placeholder="Ejemplo: 100"
                name="stock" value={datosForm.stock} onChange={manejarCambio}/>
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" 
                    accept="image/*" 
                    name="imagen" 
                    onChange={manejarCambioImagen} />
            </div>
            <button type="submit">Guardar producto</button>
        </form>
    );
}
export default FormularioProducto;