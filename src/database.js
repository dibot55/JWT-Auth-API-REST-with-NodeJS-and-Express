// MongoDB Conexión
import mongoose from "mongoose"; // ORM
import config from "./config"; // Variables de entorno

mongoose.set('strictQuery', { extends: false });

// Conexion - IIFE
(async () => {
  
  try {
    const db = await mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conexion a base de datos Existosa: ', db.connection.name)

  } catch (error) {
    console.error(error);
  }

})();