
import userRoutes from "../routes/usuarios.Routes.js";
import criptoRoutes from "../routes/criptoMonedas.Routes.js";
import express from "express";
import cors from "cors";
const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/usuarios", userRoutes);
app.use("/cripto", criptoRoutes);

// Exportar la aplicación
export default app;