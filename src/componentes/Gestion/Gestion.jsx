import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FormularioContenedor } from "../FormularioContenedor/FormularioContenedor";
import { data } from "react-router-dom";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import { preloadModule } from "react-dom";

export const Gestion = () => {

    const [productosAEditar, setProductosAEditar] = useState(null)
    const [productos, setProductos] = useState([]);
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };
    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "productos-nacionales");
            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        }
        fetchProductos();
        if (productosAEditar) {
            setDatosForm(productosAEditar);
        } else {
            setDatosForm(estadoInicialForm);
        }
    }, []);
    const manejarEnvio = async (e) => {
        e.preventDefault();
        let urlImagen = datosForm.imagen;
        if (imagenFile) {
            const formData = new FormData();
            formData.append('image', imagenFile);
            const apiKey = '45';

            try {
                const response = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                        method: 'POST',
                        body: formData,
                    })
                const data = await response.json();
                if (data.success) {
                    urlImagen = data.data.url;
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
        try {
            if (productoAEditar) {
                const docRef = doc(db, "productos nacionales",
                    productoAEditar.id);
                await updateDoc(docRef, productoFinal);
                alert("Producto actualizado con éxito.");
            } else {
                await addDoc(collection(db, "productos nacionales"),
                    productoFinal);
                alert("Producto guardado con éxito.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const cancelarEdicion = () => {
        setProductoAEditar(null);
    };
    const handleDelete = async () => {
        const confirmacion = window.confirm("¿Estas seguro?");
        if (confirmacion) {
            const docRef = doc(db, "productos-nacionales", id);
            await deleteDoc(docRef);
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado");
        }
        //<button onClick={()=>()}></button>
    }
    return (
        <div>
            <h2>Gestion de Productos</h2>
            <hr />
            <FormularioProducto datosForm={estadoInicialForm} />
            <hr />
            <h3>Lista de productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        <button onClick={() => handleDelete()}>Eliminar</button>
                    </li>
                ))}
            </ul>
            {productoAEditar && (
                <button onClick={cancelarEdicion}>
                    Cancelar Edición
                </button>
            )}
        </div>
    );
}