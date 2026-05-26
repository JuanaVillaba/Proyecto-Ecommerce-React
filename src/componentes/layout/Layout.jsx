import React from "react";
import Header from './Header';
import Footer from './Footer';
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import queso from "../../assets/queso.jpg";
import salame from "../../assets/salame.jpg";
import vino from "../../assets/vino.jpg";
import { Outlet } from "react-router-dom";
export function Layout({ children }) {
    const productos = [
        { imagen: queso, nombre: "Quesito", precio: 3000 },
        { imagen: salame, nombre: "Salamin", precio: 4500 },
        { imagen: vino, nombre: "Vinito", precio: 6000 },
    ]
    return (
        <div style={{ backgroundColor: "#FFB6C1" }}>
            <Header />
            <main>
                {children}
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}
export default Layout;