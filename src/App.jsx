import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Sales from "./pages/sales/Sales";
import Product from "./pages/product/Product"
import PrivateRoutes from "./PrivateRoute";
import Header from "./layout/header/Header";

function App() {
  return (
    <>
      <Header /> {/* El Header se muestra en todas las páginas, solo si el usuario está logueado */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Rutas protegidas por autenticación */}
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/product" element={<Product />} />
        </Route>
        
        {/* Ruta de redirección para todas las rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;




