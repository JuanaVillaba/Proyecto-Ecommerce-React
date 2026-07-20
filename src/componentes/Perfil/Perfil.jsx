import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { AuthContext, AuthProvider, useAuth } from "../Context/AuthContext";
import { getFirestore } from "firebase/firestore";

const Perfil = () => {
    const { user, logout } = useAuth(AuthContext);
    const navigate= useNavigate()
    const cerrarSesion= async()=>{
        try{
            await logout();
            navigate("/");
        }
        catch(error){
            console.error("Error al cerrar sesion: ",error);
        }
    }
    return (
        <>
            {user ? (
                <>
                    <span> Hola, {user.email}</span >
                    <button onClick={cerrarSesion}>Cerrar sesion</button>
                </>)
                : (<Link to="/login">Login</Link>)}
        </>)
}

export default Perfil;