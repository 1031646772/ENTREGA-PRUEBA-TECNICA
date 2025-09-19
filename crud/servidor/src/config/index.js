import sql from "mssql";
import app from "./app.js";
import config from "./BaseData.js";

async function main() {
  try {
    const pool = await sql.connect(config);
    console.log("Conexión exitosa con la base de datos");

    app.listen(3300, () => {
      console.log("Servidor escuchando en el puerto 3300");
    });
  } catch (err) {
    console.error("No se pudo conectar a la base de datos");
    console.error(err.message);
  }
}

main();