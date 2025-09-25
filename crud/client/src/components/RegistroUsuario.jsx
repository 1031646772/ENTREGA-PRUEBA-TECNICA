import { useState, useEffect } from 'react';
const FormUsuario = ({ Nombre, setNombre, Email, setEmail, Passwordd, setPasswordd,RegisEmplea}) => {
  
  return (
    <form className="Form" onSubmit={(e) => { 
      e.preventDefault(); // evita recargar la página
      RegisEmplea(); 
    }}>
      <h2>Registrar Nuevo Usuario</h2>
      <div className="campo">
        <h3>Nombre De Usuario:</h3>
        <input
          type="text"
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Email:</h3>
        <input
          type="email" pattern=".+@.+" required
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Password:</h3>
        <input
          type="password" required
          onChange={(event) => setPasswordd(event.target.value)}
        />
      </div>

      <button
        id="BOTRegistrar"
        className="BotonForm"
        type="submit">Registrarse
      </button>

    </form>

    );
};



export default FormUsuario;