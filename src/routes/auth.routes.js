// Autenticación
import { Router } from "express"; // Rutas
import * as authControllers from "../controllers/auth.controllers"; // auth Controllers
import { verifySignup } from "../middlewares"; // Verificaciones de Registro

const router = Router();

// ------------------------------ Auth Routes

// SignUp - Registrarse
router.post("/signup", [ verifySignup.checkUserExisted, verifySignup.checkRolesExisted ] ,authControllers.signUp);

// SignIn - Iniciar Sesión
router.post("/signin", authControllers.signIn);

export default router;