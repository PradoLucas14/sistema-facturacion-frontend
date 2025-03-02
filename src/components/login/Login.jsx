import React, { useState } from "react";
import { TextField, Button, Container, Typography, Alert, Box } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'; // Importando el ícono
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para redirigir
import axios from 'axios'; // Importando axios para hacer peticiones HTTP

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Inicializando useNavigate

    // Manejo del evento de login
    const handleLogin = async () => {
        // Validación de los campos de entrada
        if (!email || !password) {
            setErrorMessage("Por favor ingrese ambos campos");
            return;
        }
    
        try {
            // Realizando la autenticación, supongamos que tu backend está en localhost:5000
            const response = await axios.post('http://localhost:3001/api/users/login', {
                email,
                password
            });
    
            // Si la respuesta es exitosa, redirigir al usuario
            if (response.status === 200) {
                console.log("Login exitoso", response.data);
    
                // Guardar el nombre del usuario y el token en sessionStorage
                sessionStorage.setItem('username', response.data.name);  // Guardamos el nombre
                sessionStorage.setItem('token', response.data.token);      // Guardamos el token
    
                // Mostrar el contenido de sessionStorage
                console.log('sessionStorage:', sessionStorage);
    
                // Limpiar el formulario
                setEmail("");
                setPassword("");
    
                // Redirigir a la página de inicio o dashboard
                navigate('/users'); // Asegúrate de tener la ruta '/home' configurada en tu router
            }
        } catch (error) {
            // Si ocurre un error, mostrar mensaje de error
            setErrorMessage("Credenciales incorrectas, por favor intente nuevamente.");
        }
    };    
    
    return (
        <Box
            sx={{
                height: "100vh", // Ocupa todo el alto de la pantalla
                background: "linear-gradient(45deg, #ff9a9e, #ff6a00, #ff3366)", // Degradado de tonos rosas
                display: "flex",
                justifyContent: "center", // Centrado horizontal
                alignItems: "center", // Centrado vertical
            }}
        >
            <Container maxWidth="xs" sx={{ paddingTop: "50px" }}>
                {/* Contenedor del formulario con fondo sólido */}
                <Box
                    sx={{
                        backgroundColor: "#fff", // Fondo blanco sólido para el formulario
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >

                    {/* Titulo */}
                    <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
                        {/* Icono sobre el texto */}
                        <FontAwesomeIcon icon={faCircleUser} size="5x" style={{ color: "#ff3366" }} />
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                color: "#ff3366", // Color rosa para el título
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: "bold",
                                marginTop: "10px", // Separación del icono
                            }}
                        >
                            Iniciar Sesión
                        </Typography>
                    </Box>

                    {/* Formulario de login */}
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* Campo de email */}
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            autoComplete="off"
                            type="email"
                            sx={{
                                backgroundColor: "#fff",
                                '& .MuiInputLabel-root': {
                                    color: "#ff3366", // Color rosa para el label
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: "#ff3366", // Color rosa para el texto dentro del input
                                    '& fieldset': {
                                        borderColor: "#ff3366", // Borde rosa
                                        borderWidth: 1, // Borde más grueso por defecto
                                    },
                                    '&:hover fieldset': {
                                        borderColor: "#ff0033", // Borde rosa más oscuro al hacer hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: "#ff0033", // Borde rosa más oscuro al hacer foco
                                        borderWidth: 2, // Borde más grueso al hacer foco
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: "#ff3366", // Color rosa para el texto dentro del input
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: "#ff3366", // Color rosa para el placeholder
                                },
                            }}
                        />

                        {/* Campo de contraseña */}
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            type="password"
                            sx={{
                                backgroundColor: "#fff",
                                '& .MuiInputLabel-root': {
                                    color: "#ff3366", // Color rosa para el label
                                },
                                '& .MuiOutlinedInput-root': {
                                    color: "#ff3366", // Color rosa para el texto dentro del input
                                    '& fieldset': {
                                        borderColor: "#ff3366", // Borde rosa
                                        borderWidth: 1, // Borde más grueso por defecto
                                    },
                                    '&:hover fieldset': {
                                        borderColor: "#ff0033", // Borde rosa más oscuro al hacer hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: "#ff0033", // Borde rosa más oscuro al hacer foco
                                        borderWidth: 2, // Borde más grueso al hacer foco
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: "#ff3366", // Color rosa para el texto dentro del input
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: "#ff3366", // Color rosa para el placeholder
                                },
                            }}
                        />

                        {/* Botón de inicio de sesión */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            fullWidth
                            sx={{
                                marginTop: 2,
                                backgroundColor: "#ff3366", // Rosa oscuro
                                color: "#fff", // Texto blanco
                                '&:hover': {
                                    backgroundColor: "#ff0033", // Rosa más oscuro al hacer hover
                                },
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
