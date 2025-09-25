import { Router } from "express";
import { verifyToken } from "../middleware/auth.js"; // recuerda el .js
import { RegistrarUsu, LoginUsers } from "../controllers/usuarios.controllers.js";

const router = Router();

// Rutas de usuarios
router.post("/Registrar", RegistrarUsu);
router.post("/Logear", LoginUsers);

// Si quieres descomentar más rutas, solo agrega más import/export como ES Modules
// router.post("/update", UpdateEmple);
// router.post("/Eliminar", DeleteEmple);

export default router;