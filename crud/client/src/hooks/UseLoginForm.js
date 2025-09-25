import { useState } from 'react';
import { LogearUser } from '../services/UsuarioService';

export default function useLogin () {
  const [Uslogin, setuslogin] = useState("");
  const [Password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  
  const LogeoUser = async () => {
    try {
      const response = await LogearUser({
        Uslogin,
        Password
      });

      const tokenRecibido = response.data.token;
      if (tokenRecibido) {
        alert("Bienvenido ✅");
        console.log("Token recibido:", tokenRecibido);

        setToken(tokenRecibido);
        localStorage.setItem("token", tokenRecibido);

        return true; 
      } else {
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Usuario o contraseña incorrectos ");
      } else {
        alert("Error en el servidor, intenta de nuevo más tarde ⚠️");
      }
      console.error("Error en login:", error);
      return false; 
    }
  };

  return {
    Uslogin,
    setuslogin,
    Password,
    setPassword,
    LogeoUser,
    token
  };
};
