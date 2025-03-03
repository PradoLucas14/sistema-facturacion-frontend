import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Para redireccionar

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", formData);
      const { token, name } = response.data;

      // Guardar en sessionStorage y localStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", name);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      // Mostrar alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: `Bienvenido, ${name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirigir al usuario a la página "Users" después de 2 segundos
      setTimeout(() => navigate("/sales"), 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error en el inicio de sesión",
        text: "Credenciales incorrectas. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5"
    }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              onChange={handleChange}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
