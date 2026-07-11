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
            
            <p>&copy; 2026 - Mi Aplicación React</p>
        </footer>
    );
}
export default Footer;