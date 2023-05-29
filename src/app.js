import express from "express"; // Express
import morgan from "morgan"; // Visualizar las peticiones
import cors from "cors"; // Cors
import pkg from "../package.json"; // Para la desc, author, y version
import { createRoles } from "./libs/initialSetup"; // Roles user, moderator y admin
import productsRoutes from "./routes/products.routes"; // routes producs
import authRoutes from "./routes/auth.routes"; // routes auth
import userRoutes from "./routes/user.routes"; // routes user

const app = express();
createRoles(); // Ejecuta los roles de usuario desde que arranca el servidor

// Pakage.json a express
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev')); // Para que se vean las peticiones en consola
app.use(express.json()); // Para que entienda los objetos JSON 

// Ruta Raiz - Principal
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});

// Rutas products
app.use('/api/products',productsRoutes); 
// Rutas auth
app.use('/api/auth',authRoutes);
// Rutas user
app.use('/api/user',userRoutes);

// PORT
app.set('port', process.env.PORT || 3000);

export default app;