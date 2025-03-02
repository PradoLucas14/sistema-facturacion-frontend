import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = () => {
  const token = sessionStorage.getItem('token');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Si el token existe y no se ha mostrado la alerta aún
    if (token && !sessionStorage.getItem('alertShown')) {
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        // Guardamos en sessionStorage que ya se mostró la alerta
        sessionStorage.setItem('alertShown', 'true');
        setShowAlert(true);
      });
    }
  }, [token]); // Solo se ejecuta cuando el token cambia

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si no se ha mostrado la alerta, permitimos que el contenido se muestre
  if (showAlert) {
    return <Outlet />;
  }

  return <></>;
};

export default PrivateRoute;
