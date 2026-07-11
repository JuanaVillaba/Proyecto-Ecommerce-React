import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
function Header() {
    const {getCartQuantity} = useCart();
    const totalItems = getCartQuantity();
    return (
        <header className={styles.header}>
            <h1>Bienvenidos a mi App React</h1>
            <nav>
                <ul className={styles.navbar}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos-nacionales">Productos</Link></li>
                    <li><Link to="/carrito">Carrito 🛒 
                    {totalItems > 0 && <span>{totalItems}</span>}</Link></li>
                    <li><Link to="/gestion">Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;