import React from "react";
import './App.css';
import Bienvenida from './Bienvenida';
import TarjetaUsuario from './componentes/Tarjetas/TarjetaUsuario';
import Contenedor from './Contenedor';
import Asistente from './Asistente';
import Layout from "./componentes/layout/Layout";
import Footer from "./componentes/layout/Footer";
import "./index.css"
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer";
import { Contador } from "./componentes/Contador/Contador";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductoDetalle from "./componentes/Productos/ProductoDetalle";
import Inicio from "./componentes/Inicio/Inicio";
import Cart from "./componentes/Cart/Cart";

function App() {
  const usuario = {
    nombre: "Luis",
    profesion: "Diseñador UX/UI",
  };
  const asistentes = [
    { nombre: "Juanito", tarea: "Amar", emoji: "❤️" },
    { nombre: 'Juan Pérez', tarea: 'Frontend Developer', emoji: '‍' },
    { nombre: 'Ana Gómez', tarea: 'Diseñadora UX/UI', emoji: '🎨' },
    { nombre: 'Carlos Ruiz', tarea: 'Backend Developer', emoji: '‍' }
  ];
  
  return (
    //<div>
    //  {/* 2. Lo usamos como si fuera una etiqueta HTML */}
    //  <Bienvenida />
    //  <p>Este es mi primer componente montado en App.jsx</p>
    //  <TarjetaUsuario {...usuario} />
    //  <Contenedor>
    //    <h1>Titulo Contenedor</h1>
    //    <p>Parrafo contenedor</p>
    //  </Contenedor>
    //  {asistentes.map((asistente, index)=>(
    //    <Asistente key={index} {...asistente}/>
    //  ))}
    //</div>
    //<div>
      //<h1 style={{ backgroundColor: "#b8e8e1",color: "lightpink" }}>
      //  Mi aplicacion
      //</h1>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element ={<Navigate to="/inicio" replace/>}/>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/productos"
          element={<ItemListContainer
          Mensaje={"Productos destacados"}/>}/>
          <Route path="/productos/:id" element={<ProductoDetalle/>}></Route>
          <Route path="/carrito" element={<Cart />}/>
          <Route path="/tarjeta" element={<TarjetaUsuario/>}/>  
        </Route>
      </Routes>
  );
}
export default App;