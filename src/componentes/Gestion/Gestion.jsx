import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FormularioContenedor } from "../FormularioContenedor/FormularioContenedor";
import { data } from "react-router-dom";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import { preloadModule } from "react-dom";

export const Gestion =()=>{
    const [productos, setProductos]=useState([]);
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };
    useEffect(()=>{
        const fetchProductos = async ()=>{
            const productosRef = collection(db, "productos-nacionales");
            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc)=>({...doc.data(), id: doc.id}))
            );
        }
        fetchProductos();
    }, []);
    const handleDelete = async ()=>{
        const confirmacion = window.confirm("¿Estas seguro?");
        if(confirmacion){
            const docRef = doc(db, "productos-nacionales", id);
            await deleteDoc(docRef);
            setProductos(productos.filter(prod=>prod.id!==id));
            alert("Producto eliminado");
        }
        //<button onClick={()=>()}></button>
    }
    return (
        <div>
            <h2>Gestion de Productos</h2>
            <hr/>
            <FormularioProducto datosForm={estadoInicialForm}/>
            <hr/>
            <h3>Lista de productos</h3>
            <ul>
                {productos.map((prod)=>(
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        <button onClick={()=>handleDelete()}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}