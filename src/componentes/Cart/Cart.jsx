import React from "react";
import { useCart } from "../Context/CartContext";
const Cart = () => {
    const {cart, clearCart, getCartTotal} = useCart ();
    if(cart.length === 0){
        return (
            <div>
                <h1>El carrito esta vacio</h1>
                <p>Agregar productos para continuar la compra</p>
            </div>
        );
    }
    return(
        <div>
            <h1>Carrito de compras</h1>
            {cart.map(item => {
                <div key={item.id} className="cart-item">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${item.precio}</p>
                    <p>Subtotal: ${item.precio * item.quantity}</p>
                </div>
            })}
            <h3>Total a pagar: ${getCartTotal()}</h3>
            <button onClick={clearCart}>Vaciar carrito</button>
        </div>
    )
}

export default Cart;