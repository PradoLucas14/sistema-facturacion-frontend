import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name"); // Obtener el nombre del usuario
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Verifica si es una pantalla móvil
  const [openDrawer, setOpenDrawer] = useState(false); // Estado para controlar el Drawer en móvil

  // Función de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    navigate("/"); // Redirige a la página de inicio
  };

  if (!token) {
    // Si no hay token, no mostramos el header
    return null;
  }

  // Lista de enlaces que se mostrarán en el header
  const navLinks = (
    <Box>
      <Button color="inherit" component={Link} to="/users">
        Usuarios
      </Button>
      <Button color="inherit" component={Link} to="/sales">
        Ventas
      </Button>
      <Button color="inherit" component={Link} to="/product">
        Productos
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Box>
  );

  const drawerLinks = (
    <List>
      <ListItem button component={Link} to="/users">
        <ListItemText primary="Usuarios" />
      </ListItem>
      <ListItem button component={Link} to="/sales">
        <ListItemText primary="Ventas" />
      </ListItem>
      <ListItem button component={Link} to="/product">
        <ListItemText primary="Productos" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Cerrar sesión" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {userName ? `Bienvenido, ${userName}` : "Black Magic Studio"} {/* Muestra el nombre si está logueado */}
          </Typography>

          {isMobile ? (
            // Mostrar Drawer en dispositivos móviles
            <>
              <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              >
                {drawerLinks}
              </Drawer>
            </>
          ) : (
            // Mostrar botones en dispositivos grandes
            navLinks
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

