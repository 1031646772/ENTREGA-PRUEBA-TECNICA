import pool from '../config/BaseData.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = "1031646772JUKI56!";

export async function LoginUsers(req, res) {
  const { Uslogin, Password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE Username = ?",
      [Uslogin]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Comparar contraseña enviada con la almacenada (hashed)
    const isPasswordValid = bcrypt.compareSync(Password, user.PasswordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Usuario o contraseña incorrectos" });
    }

    // Crear JWT con información del usuario
    const token = jwt.sign(
      { id: user.IdUser, username: user.Username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error("Error al ejecutar query:", err);
    res.status(500).send("Error en la base de datos");
  }
}

export async function RegistrarEmple(req, res) {
  const { Nombre, Edad, Pais, Cargo, Telefono, AnosEmpresa } = req.body;

  try {
    await pool.query(
      `INSERT INTO Empleados 
       (Nombre, Edad, Pais, Cargo, Telefono, anios_empresa) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [Nombre, Edad, Pais, Cargo, Telefono, AnosEmpresa]
    );

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
    await pool.query(
      `UPDATE Empleados 
       SET Nombre=?, Edad=?, Pais=?, Cargo=?, Telefono=?, anios_empresa=? 
       WHERE Id=?`,
      [Nombre, Edad, Pais, Cargo, Telefono, AnosEmpresa, Id]
    );

    res.send("Empleado Actualizado");
  } catch (err) {
    console.error("Error al ejecutar query:", err);
    res.status(500).send("Error en la base de datos");
  }
}
*/
