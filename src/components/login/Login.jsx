import React, { useState } from "react";
import { TextField, Button, Container, Typography, Alert, Box } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Manejo del evento de login
    const handleLogin = () => {
        // Validación de los campos de entrada
        if (!email || !password) {
            setErrorMessage("Por favor ingrese ambos campos");
            return;
        }
        // Aquí iría la lógica para la autenticación (por ahora solo muestra una alerta)
        console.log("Iniciando sesión con", email, password);
        setErrorMessage("");
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
                    <Typography
                        variant="h4"
                        gutterBottom
                        textAlign="center"
                        sx={{
                            color: "#ff3366", // Color rosa para el título
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "bold",
                        }}
                    >
                        Iniciar Sesión
                    </Typography>

                    {/* Alerta de error */}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                    {/* Formulario de login */}
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* Campo de email */}
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            type="email"
                            sx={{
                                backgroundColor: "#fff",
                                '& .MuiOutlinedInput-root': {
                                    color: "#333", // Texto en negro
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
                                '& .MuiOutlinedInput-root': {
                                    color: "#333", // Texto en negro
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
