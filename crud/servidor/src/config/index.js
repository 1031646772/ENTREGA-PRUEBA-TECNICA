import app from "./app.js";
import { testConnection } from "./BaseData.js";

async function main() {
  await testConnection(); // aquí sí probamos la conexión

  const PORT = 3300;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main();