import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Verifica si el token aún es válido
  } catch (error) {
    return false;
  }
};

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isAuthenticated() && !sessionStorage.getItem('alertShown')) {
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        sessionStorage.setItem('alertShown', 'true');
        setShowAlert(true);
      });
    }
  }, [token]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return showAlert ? <Outlet /> : null;
};

export default PrivateRoute;

