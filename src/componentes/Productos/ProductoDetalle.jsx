import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ProductoDetalle = () => {
    const {id} = useParams ();
    const [producto,setProducto] = useState(null);
    useEffect(() => {
        fetch("/data/productos.json")
        .then(response => response.json())
        .then(data => {
            const productoEncontrado = data.find(
                p => p.id === parseInt(id));
                setProducto(productoEncontrado || false);
        })
        .catch( error => console.error("Error de carga: ",error))
    }, [id]);
    if (producto===null){
        return <h2>Cargando detalles del producto...</h2>
    }
    if (producto===false){
        return <h2>Producto no encontrado</h2>
    }
    return(
        <div>
            <h2>Detalle de producto: {producto.nombre}</h2>
            <img src={producto.imagen}
            alt={producto.nombre} style={{maxWidth: "400px"}}/>
            <h3>${producto.precio}</h3>
            <p>{producto.descripcion}</p>
        </div>
    );
}

export default ProductoDetalle;