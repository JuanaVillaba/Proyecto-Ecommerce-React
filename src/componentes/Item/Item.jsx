import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export function Item({ id, nombre, precio, stock, imagen, mostrarFavorito = true }) {
    const producto = { id, nombre, precio, stock, imagen };
    const [cantidad, setCantidad] = useState(0);
    const [esFavorito, setEsFavorito] = useState(Boolean);
    const { addToCart, getCantidadActual } = useCart();
    const cantidadActual = getCantidadActual(producto.id);
    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad >= 1) {
            setCantidad(cantidad - 1);
        }
    };
    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }

    const marcarComoFavorito = () => {

        if (esFavorito === true) {
            setEsFavorito(false);
        }
        else {
            setEsFavorito(true);
        }
    }
    
    const handleAddToCart = () => {
        if (stock === 0) {
            alert("No hay stock disponible de este producto.");
            return;
        }
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito`);
    }
    return (
        <div className="col">
            <div className="card h-100 shadow-sm border-0 text-dark p-2" style={{ maxWidth: "240px", margin: "0 auto" }}>
                <img src={producto.imagen} className="card-img-top rounded" alt={producto.nombre} style={{ height: "110px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column p-1 mt-2">
                    <h6 className="card-title fw-bold m-0 text-truncate" style={{ fontSize: "0.9rem" }}>{producto.nombre}</h6>
                    
                    <div className="d-flex justify-content-between align-items-center my-1">
                        <span className="text-primary fw-bold" style={{ fontSize: "0.95rem" }}>${producto.precio}</span>
                        <span className="text-muted" style={{ fontSize: "0.75rem" }}>Stock: {producto.stock} u.</span>
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-between gap-1 my-1">
                        <div className="d-flex align-items-center border rounded bg-light" style={{ padding: "1px 4px" }}>
                            <button className="btn p-0 px-1 border-0 fw-bold small" onClick={decrementar}>-</button>
                            <span className="fw-bold px-1" style={{ fontSize: "0.85rem" }}>{cantidad}</span>
                            <button className="btn p-0 px-1 border-0 fw-bold small" onClick={incrementar}>+</button>
                        </div>
                        
                        <button className="btn btn-primary btn-sm flex-grow-1 py-1 px-2 fw-semibold" style={{ fontSize: "0.8rem" }} onClick={handleAddToCart}>
                            + Carrito
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-1 mt-auto">
                        <Link to={`/productos-nacionales/${producto.id}`} className="btn btn-outline-primary btn-sm flex-grow-1 py-0" style={{ fontSize: "0.75rem", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Ver detalle
                        </Link>
                        {mostrarFavorito && (
                            <span onClick={marcarComoFavorito} style={{ fontSize: "16px", cursor: "pointer", userSelect: "none" }}>
                                {esFavorito ? "⭐" : "☆"}
                            </span>
                        )}
                    </div>
                </div>
            </div>

        </div>
        )
}