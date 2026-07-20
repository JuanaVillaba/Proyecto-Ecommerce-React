import React from "react";
import Header from './Header';
import Footer from './Footer';


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