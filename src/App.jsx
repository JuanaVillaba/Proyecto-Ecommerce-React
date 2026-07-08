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
import ProductosNacionales from "./componentes/ProductosNacionales/productosNacionales"
import ProductosNacionalesDetalle from "./componentes/ProductosNacionalesDetalle/ProductosNacionalesDetalle"
import { Gestion } from "./componentes/Gestion/Gestion";

function App() {

  return (

      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element ={<Navigate to="/inicio" replace/>}/>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/productos"
          element={<ItemListContainer
          Mensaje={"Productos destacados"}/>}/>
          <Route path="/productos/:id" element={<ProductoDetalle/>}></Route>
          <Route path="/Productos-nacionales/:id" element={<ProductosNacionalesDetalle/>}/>
          <Route path="/carrito" element={<Cart />}/>
          <Route path="/tarjeta" element={<TarjetaUsuario/>}/>  
          <Route path="/gestion" element={<Gestion/>}/>
        </Route>
      </Routes>
  );
}
export default App;