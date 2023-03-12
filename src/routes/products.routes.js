import { Router } from "express"; // Rutas
import * as productsControllers from "../controllers/products.cotrollers"; // Controllers product
import { authJwt } from "../middlewares"; // Verificacion con tokens - Automaticamente busca en el index.js

const router = Router();

// ---------------------------- Routes Products

// Create
router.post('/', [ authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin ], productsControllers.createProducts); // Requiere Verificacion con JWT

// Read
router.get('/', productsControllers.readProducts);

// Read by ID
router.get('/:productid', productsControllers.readProductsById);

// Update
router.put('/:productid', [authJwt.verifyToken,  authJwt.isAdmin] ,productsControllers.updateProducts); // Requiere Verificacion con JWT

// Delete
router.delete('/:productid', [authJwt.verifyToken, authJwt.isAdmin ] ,productsControllers.deleteProducts); // Requiere Verificacion con JWT



export default router;
