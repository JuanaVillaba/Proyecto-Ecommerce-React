import { useState } from 'react';
export function Contador() {
    const [contador, setContador] = useState(0);
    const incrementar = () => {
        setContador(contador + 1); //¡Usamos la función para actualizar el estado!
    };
    //Continúa
    const decrementar = () => {
        setContador(contador - 1);
    };
    return (
        <div style={{
            margin: '20px', padding: '20px', border: '1px solid black',
            display:"flex", flexDirection:"column", alignItems:"center" }}>
            <h3>Contador de Ejemplo</h3>
            <p>Valor actual: {contador}</p>
            <button onClick={incrementar}>Sumar +1</button>
            <button onClick={decrementar}>Restar -1</button>
        </div>
    );
}