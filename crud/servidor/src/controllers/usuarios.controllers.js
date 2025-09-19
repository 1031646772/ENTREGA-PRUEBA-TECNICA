import sql from 'mssql/msnodesqlv8.js';
import poolPromise from '../config/BaseData.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = "1031646772JUKI56!";

 export async function LoginUsers(req, res) {
  const { Uslogin, Password } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('Uslogin', sql.NVarChar, Uslogin)
      .query(`SELECT * FROM Usuarios (NOLOCK) WHERE Username=@Uslogin`);

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Comparar contraseña enviada con la almacenada (hashed)
    const isPasswordValid = bcrypt.compareSync(Password, user.PasswordHash); // passwd debe estar hasheada en DB
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Crear JWT con información del usuario
    const token = jwt.sign(
      { id: user.IdUser, username: user.Uslogin }, // payload
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token }); // enviar token al frontend

  } catch (err) {
    console.error("Error al ejecutar query:", err);
    res.status(500).send("Error en la base de datos");
  }
}


export async function RegistrarEmple(req, res) {
  const { Nombre, Edad, Pais, Cargo, Telefono, AnosEmpresa } = req.body;
  try {
    const pool = await poolPromise; // obtenemos pool conectado
    await pool.request()
      .input('Nombre', sql.NVarChar, Nombre)
      .input('Edad', sql.Int, Edad)
      .input('Pais', sql.NVarChar, Pais)
      .input('Cargo', sql.NVarChar, Cargo)
      .input('Telefono', sql.BigInt, Telefono)
      .input('AnosEmpre', sql.Int, AnosEmpresa)
      .query(`
        INSERT INTO Empleados 
        (Nombre, Edad, Pais, Cargo, telefono, anios_empresa) 
        VALUES (@Nombre, @Edad, @Pais, @Cargo, @Telefono, @AnosEmpre)
      `);

    res.send("Empleado registrado");
  } catch (err) {
    console.error("Error al ejecutar query:", err);
    res.status(500).send("Error en la base de datos");
  }
}



/*
export async function UpdateEmple(req, res) {
  const { Nombre, Edad, Pais, Cargo, Telefono, AnosEmpresa, Id } = req.body;
  try {
    const pool = await poolPromise; // obtenemos pool conectado
    await pool.request()
      .input('Nombre', sql.NVarChar, Nombre)
      .input('Edad', sql.Int, Edad)
      .input('Pais', sql.NVarChar, Pais)
      .input('Cargo', sql.NVarChar, Cargo)
      .input('Telefono', sql.BigInt, Telefono)
      .input('AnosEmpre', sql.Int, AnosEmpresa)
      .input('id', sql.Int, Id)
      .query(`
        update Empleados 
        set Nombre=@Nombre, Edad=@Edad, Pais=@Pais, Cargo=@Cargo, Telefono=@Telefono, AnosEmpre=@AnosEmpre where id=@Id
      `);

    res.send("Empleado Actualizado");
  } catch (err) {
    console.error("Error al ejecutar query:", err);
    res.status(500).send("Error en la base de datos");
  }
}


*/
