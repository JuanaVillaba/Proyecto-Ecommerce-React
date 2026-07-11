import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
export function Item({ id, nombre, precio, stock, imagen }) {
    const producto = { id, nombre, precio, stock, imagen };
    const [cantidad, setCantidad] = useState(0);
    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };
    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }
    const [esFavorito, setEsFavorito] = useState(Boolean);
    const marcarComoFavorito = () => {
        //setEsFavorito(!esFavorito);
        if (esFavorito === true) {
            setEsFavorito(false);
        }
        else {
            setEsFavorito(true);
        }
    }
    const { addToCart, getCantidadActual } = useCart();
    const cantidadActual = getCantidadActual(producto.id);
    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito`);
    }
    return (
        <div style={{
            border: "2px solid black", padding: "5px",
            borderRadius: '8px', textAlign: 'center'
        }}>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>Stock disponible: {producto.stock}</p>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent:
                    'center', margin: '10px 0'
            }}>

                <Link key={producto.id} to={`/productos-nacionales/${producto.id}`}>Ver detalle</Link>
                <button onClick={decrementar}>-</button>
                <p style={{ margin: '0 10px' }}>{cantidad}</p>
                <button onClick={incrementar}>+</button>
            </div>
            <span onClick={marcarComoFavorito}
                style={{ fontSize: "24px" }}>
                {esFavorito ? "⭐" : "☆"}
            </span>
            <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
    )
}