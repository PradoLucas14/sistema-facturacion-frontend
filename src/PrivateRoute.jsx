import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const token = localStorage.getItem("token"); // Obtenemos el token desde localStorage

  if (!token) {
    // Si no existe el token, redirigimos a la página de login ("/")
    return <Navigate to="/" />;
  }

  // Si existe el token, permitimos el acceso a las rutas hijas
  return <Outlet />;
}

export default PrivateRoutes;


