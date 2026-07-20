import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import ProductosNacionalesDetalle from "../ProductosNacionalesDetalle/ProductosNacionalesDetalle";
import { useCart } from '../Context/CartContext';
import { Item } from "../Item/Item";

import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

const ProductosNacionales = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [cargando, setCargando] = useState(true);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [ultimoVisible, setUltimoVisible] = useState(null);
    const [hayMas, setHayMas] = useState(true);
    const PRODUCTOS_POR_PAGINA = 6;
    const buscadoActivo = searchTerm.trim() !== "";
    const { addToCart } = useCart();

    const obtenerProductosIniciales = () => {
        setCargando(true);
        const productosDB = collection(db, "productos nacionales");
        const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));
        getDocs(q).then((resp) => {
            const productosData = resp.docs.map((doc) => (
                { ...doc.data(), id: doc.id }));
            setProductos(productosData);
            const ultimoDoc = resp.docs[resp.docs.length - 1];
            setUltimoVisible(ultimoDoc);
            setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
        }).catch(error => console.error("Error al obtener productos: ", error))
            .finally(() => setCargando(false));
    };
    const obtenerMasProductos = () => {
        if (!hayMas || cargandoMas) return;
        setCargandoMas(true);
        const productosDB = collection(db, "productos nacionales");
        const q = query(productosDB, startAfter(ultimoVisible),
            limit(PRODUCTOS_POR_PAGINA));
        getDocs(q).then((resp) => {
            const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProductos(productosAnteriores => [...productosAnteriores, ...productosData]);
            const ultimoDoc = resp.docs[resp.docs.length - 1];
            setUltimoVisible(ultimoDoc);
            setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
        }).catch(error => console.error("Error al cargar mas productos: ", error))
            .finally(() => setCargandoMas(false));
    };
    const verMenos = () => {
        obtenerProductosIniciales();
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        obtenerProductosIniciales();
    }, [])
    
    const productosFiltrados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col md={11} className="mx-auto">
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese el nombre del producto a buscar"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                        <FaSearch style={{
                            marginRight: '1px', position: "absolute",
                            top: "50%", right: "15px", transform: "translateY(-50%)",
                            color: "#a0a0a0", zIndex: 10, pointerEvents: "none"
                        }} />
                    </div>
                </Col>
            </Row>
            
            {cargando ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary"/>
                    <p className="mt-2">Cargando catálogo...</p>
                </div>
            ):(
                <Row xs={1} lg={4} className="g-4 justify-content-center">
                    {buscadoActivo ? (
                    productosFiltrados.length > 0 ? (
                        productosFiltrados.map((producto) => (
                            <Item key={prod.id}
                                    id={prod.id}
                                    nombre={prod.nombre}
                                    precio={prod.precio}
                                    stock={prod.stock}
                                    imagen={prod.imagen}
                                    mostrarFavorito={false} 
                            />
                        ))
                    ) : (
                        <Col xs={12} className="text-center mt-4">
                            <h4>No se encontro el producto buscado: {searchTerm}</h4>
                        </Col>
                    )
                ) : (
                    productos.map(prod => (
                        <Item key={prod.id}
                                id={prod.id}
                                mbre={prod.nombre} // Si tenías un error de tipeo en tu código viejo, recuerda dejarlo como 'nombre'
                                nombre={prod.nombre}
                                precio={prod.precio}
                                stock={prod.stock}
                                imagen={prod.imagen}
                                mostrarFavorito={false}
                            />
                    ))
                )}
            </Row>)}
            {!buscadoActivo && !cargando &&(
                <Row className="mt-4 mb-4">
                <Col className="text-center d-flex justify-content-center gap-2">
                    {productos.length > PRODUCTOS_POR_PAGINA && (
                        <Button variant="secondary" onClick={verMenos}>Ver menos</Button>
                    )}
                    {hayMas ? (
                        <Button onClick={obtenerMasProductos} disabled={cargandoMas}>
                            {cargandoMas ? <Spinner as="span" animation="border" size="sm" />
                                : 'Cargar mas'}
                        </Button>
                    ) : (
                        productos.length > PRODUCTOS_POR_PAGINA && <Alert variant="light"
                            className="m-0">No hay mas productos para mostrar.</Alert>
                    )}
                </Col>

            </Row>
            )}
            
        </Container>
    )
}
export default ProductosNacionales;
