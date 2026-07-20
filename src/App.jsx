import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contenedor from './Contenedor';
import Asistente from './Asistente';
import Layout from "./componentes/layout/Layout";
import Footer from "./componentes/layout/Footer";
import "./index.css"
import {ItemListContainer} from "./componentes/ItemListContainer/ItemListContainer";
import { Contador } from "./componentes/Contador/Contador";
import { Routes, Route, Navigate } from "react-router-dom";

import Inicio from "./componentes/Inicio/Inicio";
import Cart from "./componentes/Cart/Cart";
import ProductosNacionales from "./componentes/ProductosNacionales/productosNacionales"
import ProductosNacionalesDetalle from "./componentes/ProductosNacionalesDetalle/ProductosNacionalesDetalle"
import { Gestion } from "./componentes/Gestion/Gestion";
import Registro from "./componentes/Registro/Registro";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import Login from "./componentes/Login/Login"
import Perfil from "./componentes/Perfil/Perfil";
import { SearchProvider } from "./componentes/Context/SearchContext";

function App() {

  return (
    <>
    <SearchProvider>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/alta" element={
            <ProtectedRoute
              rolesPermitidos={["administrador"]}>
                <Gestion/>
            </ProtectedRoute>}/>
            <Route path="/perfil" element={
            <ProtectedRoute
              rolesPermitidos={["administrador","usuarios"]}><Perfil/>
            </ProtectedRoute>}/>
          <Route path="/" element ={<Navigate to="/inicio" replace/>}/>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/productos-nacionales" element={<ProductosNacionales/>}/>
          <Route path="/productos-nacionales/:id" element={<ProductosNacionalesDetalle/>}/>
          <Route path="/carrito" element={<Cart/>}/>
        </Route>
      </Routes>
      </SearchProvider>
      </>
  );
}
export default App;