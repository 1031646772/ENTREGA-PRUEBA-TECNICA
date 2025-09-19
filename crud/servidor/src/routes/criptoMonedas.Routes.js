import { Router } from "express";
import { verifyToken } from "../middleware/auth.js"; 
const router=Router();

//const {RegistrarEmple,UpdateEmple,DeleteEmple,ConsultarEmple}=require("../controllers/empleados.controllers")
import { TraerCriptos, RegistrarCripto,ListarCryptos } from "../controllers/criptomonedas.controllers.js";
router.post('/Registrar', verifyToken, RegistrarCripto);
router.get('/consultar',verifyToken,ListarCryptos);
//router.post('/update',UpdateEmple);
//router.post('/Eliminar',DeleteEmple);
router.get('/externas',verifyToken,TraerCriptos);

export default router

