import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FormularioContenedor } from "../FormularioContenedor/FormularioContenedor";
import { data } from "react-router-dom";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import { preloadModule } from "react-dom";


import styled from "styled-components";
import { FaEdit, FaTrash } from 'react-icons/fa';


export const Gestion = () => {
    const BotonAccion = styled.button`
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 8px;
    transition: all 0.2s ease;
    &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }`;
    const BotonEditar = styled(BotonAccion)`
    border-color: #ffc107;
    color: #ffc107;
    &:hover {
    background-color: #ffc107;
    color: white;
    }`;
    const BotonEliminar = styled(BotonAccion)`
    border-color: #dc3545;
    color: #dc3545;
    &:hover {
    background-color: #dc3545;
    color: white;
    }`;
    const ProductoItem = styled.li`
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding-left: 12px;
        margin-right: 12px;
        margin-bottom: 12px;
        }
    `;
    const ProductoInfo = styled.span`
        flex-grow: 1;
        font-size: 16px;
    `;

    const [imagenFile, setImagenFile] = useState(null);
    const [productoAEditar, setProductoAEditar] = useState(null)
    const [productos, setProductos] = useState([]);
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };
    const [datosForm, setDatosForm] = useState(estadoInicialForm);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "productos nacionales");
            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        }
        fetchProductos();
    }, []);
    useEffect(() => {
        if (productoAEditar) {
            setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, [productoAEditar]);
    const manejarEnvio = async (e) => {
        e.preventDefault();
        let urlImagen = datosForm.imagen;
        if (imagenFile) {
            const formData = new FormData();
            formData.append('image', imagenFile);
            const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
            try {
                const response = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        body: formData,
                    })
                const respuestaImgBB = await response.json();
                if (respuestaImgBB.success) {
                    urlImagen = respuestaImgBB.data.url;
                } else {
                    throw new Error('La subida de la imagen falló.');
                }
            }
            catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
                return;
            }
        }
        const productoFinal = { ...datosForm, imagen: urlImagen };
        if (datosForm.nombre.trim() === "" || datosForm.precio <= 0) {
            alert("Por favor complete los datos y el precio debe ser mayor a cero");
            return;
        }
        try {
            if (productoAEditar) {
                const docRef = doc(db, "productos nacionales",
                    productoAEditar.id);
                await updateDoc(docRef, productoFinal);
                setProductos(productos.map(p=> p.id === productoAEditar.id ?
                    {...productoFinal, id: p.id}: p));
                    alert("Producto actualizado con éxito.");
                    setProductoAEditar(null)
                } else {
                    const docRef = await addDoc(collection(db, "productos nacionales"), productoFinal);
                    setProductos([...productos, {...productoFinal, id: docRef.id}])
                    alert("Producto guardado con éxito.");
                    setDatosForm(estadoInicialForm);                
            }
        } catch (error) {
            console.error("Error, no se conecto con firestore:", error);
        }
    };
    const cancelarEdicion = () => {
        setProductoAEditar(null);
    };
    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Estas seguro?");
        if (confirmacion) {
            const docRef = doc(db, "productos nacionales", id);
            await deleteDoc(docRef);
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado");
        }

    }
    
    return (
        <div>
            <h2>Gestion de Productos</h2>
            <hr />
            <FormularioProducto
                datosForm={datosForm} setDatosForm={setDatosForm}
                manejarEnvio={manejarEnvio} setImagenFile={setImagenFile}
                esEdicion={!!productoAEditar} />
            <hr />
            <h3>Lista de productos</h3>
            <ul>
                {productos.map((prod) => (
                    <ProductoItem key={prod.id}>
                        <ProductoInfo>
                            {prod.nombre}
                            -Categoria: {prod.categoria}
                            -Precio: ${prod.precio}
                            -Stock: {prod.stock}
                        </ProductoInfo>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                        <BotonEditar onClick={() => setProductoAEditar(prod)}
                            style={{ marginTop: "5px", marginBottom: "5px"}}>
                            <FaEdit style={{ marginRight: '5px'}} />Editar</BotonEditar>
                        <BotonEliminar onClick={() => handleDelete(prod.id)}
                             style={{ marginTop: "5px", marginBottom: "5px", marginRight: "12px"}}>
                            <FaTrash style={{ marginRight: '5px'}} />Eliminar</BotonEliminar>
                        </div>
                    </ProductoItem>
                ))}
            </ul>
            {productoAEditar && (
                <BotonAccion onClick={cancelarEdicion}>
                    Cancelar Edición
                </BotonAccion>
            )}
        </div>
    );
}