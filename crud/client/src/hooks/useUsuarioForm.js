import { useState } from 'react';
import { registrarUsuario } from '../services/UsuarioService';

export default function useUsuario ()  {
    const [Nombre, setNombre] = useState(""); 
    const [Email, setEmail] = useState("");
    const [Passwordd, setPasswordd] = useState("");   
        const RegisEmplea = () => { 
        const fecha= new Date().toISOString().slice(0, 19).replace('T', ' ')
        registrarUsuario({
            Nombre,
            Email,
            Passwordd,
            fecha
        }) 
        .then(() => alert("Te registraste correctamente"))
        .catch(() => alert("Error al registrar Usuario"));
        }
    
    
    return {
        Nombre, setNombre,
        Email, setEmail,
        Passwordd, setPasswordd,
        RegisEmplea
        };
    
};
