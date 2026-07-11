import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link,Route, useParams } from "react-router-dom";
import styles from "../ProductosNacionalesDetalle/ProductosNacionalesDetalle.module.css"

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
                <p>Cargando detalles</p>
            )}
        </div>
    )
}
export default ProductosNacionalesDetalle