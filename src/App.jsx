import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import PrivateRoute from './PrivateRoute'; // Importamos la ruta privada
import "./App.css"

const App = () => {
  return (
    <Routes>
      {/* Ruta pública de Login */}
      <Route path="/home" element={<Home />} />

      {/* Ruta privada: El componente PrivateRoute protegerá todas las rutas dentro */}
      <Route element={<PrivateRoute />}>
        <Route path="/users" element={<Users />} />
        {/* Puedes añadir más rutas privadas aquí */}
      </Route>

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;


