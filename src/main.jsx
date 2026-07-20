import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './componentes/Context/CartContext.jsx';
import { AuthContext, AuthProvider } from './componentes/Context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App></App>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)