import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"
import { Link } from "react-router-dom";

function Footer() {
    const [equipo, setEquipo] = useState([]);
    useEffect(() => {
        const laburantes = collection(db, "equipo");
        getDocs(laburantes).then((resp) => {
            setEquipo(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, [])

    return (
        <footer style={{
            backgroundColor: "#e28dca", padding: "10px",
            textAlign: "center", marginTop: "20px", color: "black"
        }}>
            <div className={styles.direccion}>
            <h3>Equipo</h3>
            {equipo.map((trabajador) =>(
                <div className={styles.card}>
                    <div key={trabajador.id}>
                        <img src={trabajador.fotoURL} alt={trabajador.nombre} />
                        <p>{trabajador.nombre}</p>
                        <p>{trabajador.rol}</p>
                        <p>{trabajador.linkedinURL}</p>
                    </div>
                </div>
            ))}
            </div>
            <p>&copy; 2026 - Mi Aplicación React</p>
        </footer>
    );
}
export default Footer;