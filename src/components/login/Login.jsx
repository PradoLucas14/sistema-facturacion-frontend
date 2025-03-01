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
        <Container maxWidth="xs" sx={{ paddingTop: "50px" }}>
            {/* Titulo */}
            <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: "#8e44ad" }}>
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
                />

                {/* Campo de contraseña */}
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    type="password"
                />

                {/* Botón de inicio de sesión */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    sx={{
                        marginTop: 2,
                        backgroundColor: "#f39c12",
                        '&:hover': {
                            backgroundColor: "#e67e22"
                        }
                    }}
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
