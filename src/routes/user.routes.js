import { Router } from "express"; // Rutas
import * as userControllers from "../controllers/user.controllers"; // Controllers 
import { authJwt, verifySignup } from "../middlewares"; // Autenticación

const router = Router();

// -------------------------------- User Routes

// Create
router.post('/', [ authJwt.verifyToken ,authJwt.isAdmin, verifySignup.checkRolesExisted], userControllers.createUser);

export default router;