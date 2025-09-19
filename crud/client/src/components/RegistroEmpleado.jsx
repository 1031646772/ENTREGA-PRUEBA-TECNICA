import { useState, useEffect } from 'react';
const FormEmpleado = ({ Nombre, setNombre, Edad, setEdad, Pais, setPais, Cargo, setCargo, Telefono,
   setTelefono, AnosEmpresa, setAnosEmpresa, RegisEmplea,empleadoEditando,Accion,setAccion,Id,setId}) => {
    
  useEffect(() => {
    console.log('Hola',empleadoEditando)
    if (empleadoEditando) {
      setNombre(empleadoEditando.Nombre);
      setEdad(empleadoEditando.Edad);
      setPais(empleadoEditando.Pais);
      setCargo(empleadoEditando.Cargo);
      setTelefono(empleadoEditando.telefono);
      setAnosEmpresa(empleadoEditando.anios_empresa);
      setAccion("Actualizar");
      setId(empleadoEditando.id)
    }
  }, [empleadoEditando]);

  return (
    <div className="Form">
      <div className="campo">
        <h3>Nombre:</h3>
        <input
          type="text"
          onChange={(event) => setNombre(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Edad:</h3>
        <input
          type="number"
          onChange={(event) => setEdad(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Pais:</h3>
        <input
          type="text"
          onChange={(event) => setPais(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Cargo:</h3>
        <input
          type="text"
          onChange={(event) => setCargo(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Telefono:</h3>
        <input
          type="number"
          onChange={(event) => setTelefono(event.target.value)}
        />
      </div>

      <div className="campo">
        <h3>Años:</h3>
        <input
          type="number"
          onChange={(event) => setAnosEmpresa(event.target.value)}
        />
      </div>

      <div className="campo" id="StatusAccion">
        <h3>Estatus Accion:</h3>
        <input
          type="text"
          onChange={(event) => setAccion("Registrar")}
        />
      </div>
      <div className="campo" id="IDUSER">
        <h3>ID USER:</h3>
        <input
          type="text"
          onChange={(event) => setAccion("")}
        />
      </div>

      <button
        id="BOTRegistrar"
        className="BotonForm"
        onClick={RegisEmplea}>
        {empleadoEditando ? 'Actualizar' : 'Registrar'}
      </button>

      <button
        id="BOTListar"
        className="BotonForm">
        Listar
      </button>
    </div>

    );
};



export default FormEmpleado;