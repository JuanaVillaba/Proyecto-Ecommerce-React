import React from "react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const {cart, clearCart, getCartTotal} = useCart ();
    if(cart.length === 0){
        return (
            <div>
                <h1>El carrito esta vacio</h1>
                <p>Agregar productos para continuar la compra</p>
                <Link to="/productos-nacionales" className="btn-primary mt-3">Ver productos</Link>
            </div>
        );
    }
    return(
        <div>
            <h1 className="text-center mb-4 fw-bold">Carrito de compras</h1>
             <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
            {cart.map(item => (
                <div key={item.id} className="col">
                    <div className="card h-100 shadow-sm border-0 p-2" style={{ maxWidth: "240px", margin: "0 auto" }}>
                    <img src={item.imagen} className="card-img-top rounded" alt={item.nombre} style={{ height: "110px", objectFit: "cover" }} />
                    <div className="card-body d-flex flex-column p-1 mt-2">
                    <h6 className="card-title fw-bold m-0 text-truncate" style={{ fontSize: "0.9rem" }}>{item.nombre}</h6>
                    <div className="d-flex justify-content-between align-items-center my-1">
                    
                    
                        <span className="text-primary fw-bold" style={{ fontSize: "0.95rem" }}>${item.precio}</span>
                        <span className="text-muted" style={{ fontSize: "0.75rem" }}>Stock: {item.quantity} u.</span>
                        <span className="text-primary fw-bold" style={{ fontSize: "0.95rem" }}>${item.precio * item.quantity}</span>
                    </div>
                    </div>
                    </div>
                    </div>

                    
            ))}
            </div>
            <div className="text-center mt-5">
                <h3>Total a pagar: ${getCartTotal()}</h3>
                <div className="d-flex justify-content-center gap-2 mt-3">
                    <button onClick={clearCart} className="btn btn-outline-secondary btn-sm">Vaciar carrito</button>
                    <Link to="/" className="btn btn-success btn-sm px-4">Finalizar compra</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart;