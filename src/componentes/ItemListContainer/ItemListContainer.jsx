import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/Itemlist";
import styles from "./ItemListContainer.module.css";
import Productos from "../Productos/Productos";
import { Item } from "../Item/Item";
export function ItemListContainer({ Mensaje }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch ("/data/productos.json")
        .then((response)=>response.json())
        .then((data)=>{setProducts(data)})
        .catch((error)=>{
            console.error("Error al cargar productos", error);
            })
    },[]);
    return (
        <div>
            <h2>{Mensaje}</h2>
            {products.map((prod)=>(
                <Item key={prod.id} {...prod}/>
                
            ))}
        </div>
    );
}
export default ItemListContainer;