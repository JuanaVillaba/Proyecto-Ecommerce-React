import React, {useState, useEffect} from "react";
import styles from "./Inicio.module.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../../firebase/config";
import {ItemList} from "../ItemList/Itemlist";
import { Item } from "../Item/Item";

function Inicio(){
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const idsDestacados = ['6', 'yHbtG8uHJUWMqYhGU67T', '7']; 

    useEffect(() => {
        const obtenerDestacados = async () => {
            setCargando(true);
            try {
                const productosRef = collection(db, "productos nacionales");
                const q = query(productosRef, where(documentId(), "in", idsDestacados));
                const resp = await getDocs(q);
                const productosData = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setProductosDestacados(productosData);
            } catch (error) {
                console.error("Error al traer los destacados de Inicio:", error);
            } finally {
                setCargando(false);
            }
        };
        obtenerDestacados();
    }, []);
    return (
        <div className={styles.fondo}>
            <div className="container py-4">
                {cargando ? (
                    <div className="text-center my-5">
                        <p className="mt-2 text-dark fs-5">Cargando destacados...</p>
                    </div>
                ) : (
                    <div className="col-xl-10 mx-auto">
                        <div lg={4} className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                        {productosDestacados.map((prod) => (
                            <Item 
                                key={prod.id}
                                id={prod.id}
                                nombre={prod.nombre}
                                precio={prod.precio}
                                stock={prod.stock}
                                imagen={prod.imagen}
                                mostrarFavorito={true}
                            />
                        ))}
                    </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Inicio;