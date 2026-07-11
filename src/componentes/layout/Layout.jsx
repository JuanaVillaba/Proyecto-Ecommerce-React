import React from "react";
import Header from './Header';
import Footer from './Footer';

import queso from "../../assets/queso.jpg";
import salame from "../../assets/salame.jpg";
import vino from "../../assets/vino.jpg";
import { Outlet } from "react-router-dom";
export function Layout({ children }) {
    
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