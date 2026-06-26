import React, { useState, useContext, createContext } from "react";

export const CartContex = createContext();

export const useCart = () => {
    const context = useContext(CartContex);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(
                item => item.id === product.id ?
                    { ...item, quantity: item.quantity + quantity } : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    }

    const removeItem = (productId)=>{
        const updatedCart = cart.filter(item=>item.id !==productId);
        setCart(updatedCart);
    }

    const isInCart = (productId)=>{
        return cart.some(item =>item.id===productId)
    }
    const getCantidadActual = (productId)=>{
        const item = cart.find(item=>item.id===productId);
        return item ? item.cantidad : 0;
    };
    const clearCart = () => {
        setCart([]);
    };
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };
    return (
        <CartContex.Provider value={{
            cart, addToCart, getCantidadActual, clearCart, getCartQuantity,
            getCartTotal, removeItem, isInCart
        }}>
            {children}
        </CartContex.Provider>
    );
}