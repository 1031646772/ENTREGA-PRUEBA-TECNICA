import { useState } from 'react';
import { registrarUsuario } from '../services/UsuarioService';
import { updateEmpleadoService } from '../services/UsuarioService';

export default function useUsuario ()  {
    const [Id, setId] = useState(0);            
    const [CmcId, setCmcId] = useState(0);      // Id de CoinMarketCap
    const [Nombre, setNombre] = useState("");   // Nombre de la cripto
    const [Simbolo, setSimbolo] = useState(""); // Símbolo de la cripto (BTC, ETH, etc.)
    const [Slug, setSlug] = useState("");       // Slug o nombre corto URL friendly
    const [Accion, setAccion] = useState(""); 
    
        const RegisEmplea = () => { 
        if(Accion=='Registrar'){
        registrarUsuario({
            Nombre,
            Edad,
            Pais,
            Cargo,
            Telefono,
            AnosEmpresa,
        }) 
        .then(() => alert("Empleado registrado"))
        .catch(() => alert("Error al registrar empleado"));
        }
        else if (Accion=='Actualizar'){
        updateEmpleadoService({
            Nombre,
            Edad,
            Pais,
            Cargo,
            Telefono,
            AnosEmpresa,
            Id
        }) 
        .then(() => alert("Empleado Actualizado"))
        .catch(() => alert("Error al registrar empleado"));
        }
        }
    
    
    return {
        Nombre, setNombre,
        Edad, setEdad,
        Pais, setPais,
        Cargo, setCargo,
        Telefono, setTelefono,
        AnosEmpresa, setAnosEmpresa,
        Accion, setAccion,
        Id, setId,
        registrarUsuario
        };
    
};
