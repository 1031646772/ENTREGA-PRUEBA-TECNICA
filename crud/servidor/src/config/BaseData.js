import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "bguju0pbfgqavbxldaor-mysql.services.clever-cloud.com",
  user: "unavbshsafv9eo0e",
  password: "vhuo8oNWQbKALqo4T2Xd",
  database: "bguju0pbfgqavbxldaor",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a MySQL");
    connection.release();
  } catch (err) {
    console.error("No se pudo conectar a la base de datos:");
    console.error(err.message);
    process.exit(1);
  }
}

export default pool;
