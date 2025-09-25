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

export async function RegistrarUsu(req, res) {
  const { Nombre, Email, Passwordd, fecha } = req.body;
  const hash = await bcrypt.hash(Passwordd, 10);
  console.log("Hash generado:", hash);
  try {
    await pool.query(
      `INSERT INTO Usuarios 
       (Username, Email, PasswordHash, FechaRegistro) 
       VALUES (?, ?, ?, ?)`,
      [Nombre, Email, hash, fecha]
    );

    res.send("Usuario registrado");
  } catch (err) {
    console.error("Error al ejecutar query:", err);
    res.status(500).send("Error en la base de datos");
  }
}
