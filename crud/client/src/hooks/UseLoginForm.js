import { useState } from 'react';
import { LogearUser } from '../services/UsuarioService';

export default function useLogin () {
    const [Uslogin, setNombre] = useState("");
    const [Password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    
    const LogeoUser = async () => {
    try {
        const response = await LogearUser({
        Uslogin,
        Password
        });
        
        alert("Usuario encontrado");
        console.log("Token recibido:", response.data.token);
        const tokenRecibido = response.data.token;
        setToken(tokenRecibido); //lo guardamos en el estado
        localStorage.setItem("token", tokenRecibido); //guardamos en localStorage

    } catch (error) {
        if (error.response && error.response.status === 401) {
        alert("Usuario o contraseña incorrectos");
        } else {
        alert("Error en el servidor, intenta de nuevo más tarde");
        }
        console.error("Error en login:", error);
        }
        };

    return {
    Uslogin,
    setNombre,
    Password,
    setPassword,
    LogeoUser,
    token
    };
};