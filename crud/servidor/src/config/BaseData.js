import sql from "mssql";

const config = {
  connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\CrudJulian;Database=cryptoinvestment;Trusted_Connection=Yes;"
};

// Creamos y exportamos un pool conectado
 const poolPromise = sql.connect(config)
  .then(pool => {
    console.log("Conexión exitosa a SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("Error de conexión", err);
    console.error(JSON.stringify(err, null, 2));
    process.exit(1); // detener app si no se conecta
  });

export default poolPromise