import React, { useContext } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { AuthContext, AuthProvider, useAuth } from "../Context/AuthContext";
import { getFirestore } from "firebase/firestore";
import Perfil from "../Perfil/Perfil";
function Header() {
    const {getCartQuantity} = useCart();
    const totalItems = getCartQuantity();
    const {user, logout}=useAuth(AuthContext);
    return (
        <header className={styles.header}>
            <h1 className="navbar-brand fw-bold text-primary fs-3 m-0">Compumundo</h1>
            <nav className="d-flex align-items-center justify-content-center">
                 <div className="d-flex align-items-center gap-3 ms-auto ms-lg-4">
                    {user ? (
                        <>{user.rol === "administrador"&& (
                        <>
                            <Link to="/perfil" style={{color: "black", textDecoration: "none"}}>Perfil</Link>
                            <Link to="/alta" style={{color: "black", textDecoration: "none"}}>Dashboard</Link>
                            </>)}
                            
                        </>):(
                            <Link to="/login">Login</Link>
                        )}
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/productos-nacionales" className="nav-link">Productos</Link>
                    <Link to="/carrito" className="nav-link">Carrito 🛒 
                    {totalItems > 0 && <span>{totalItems}</span>}</Link>
                    
                </div>
            </nav>
        </header>
    );
}
export default Header;