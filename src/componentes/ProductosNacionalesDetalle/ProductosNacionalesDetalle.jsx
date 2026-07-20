import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link,Route, useParams } from "react-router-dom";
import styles from "../ProductosNacionalesDetalle/ProductosNacionalesDetalle.module.css"
import { Helmet } from 'react-helmet';
import { Spinner } from "react-bootstrap";

 const ProductosNacionalesDetalle = () => {
    const [prod, setItem] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const docRef = doc(db, "productos nacionales", id);
            getDoc(docRef).then((resp) => {
                if (resp.exists()) {
                    setItem({ ...resp.data(), id: resp.id });
                } else {
                    console.log("No se encontro el producto");
                }
            })
                .catch(error => console.log(error));
        }
    }, [id]);
    return (
        <>
        {prod && (
            <Helmet>
                <title>Mi tienda | {prod.nombre}</title>
                <meta name="description" content={`Detalles y precio del producto${prod.nombre}.`} />
                </Helmet>
        )}
        <div className={styles.CartaDetalle}>
            {prod ? (
                <div>
                    <h2>Detalle de producto: {prod.nombre}</h2>
                    <img src={prod.imagen}
                        alt={prod.nombre} style={{ maxWidth: "400px" }} />
                    <h3>${prod.precio}</h3>
                    <p>{prod.descripcion}</p>
                </div>
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando detalles...</span>
                </Spinner>
            )}
        </div>
        </>
    )
}
export default ProductosNacionalesDetalle