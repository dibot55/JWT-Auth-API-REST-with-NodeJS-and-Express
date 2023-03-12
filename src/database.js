// MongoDB Conexión
import mongoose from "mongoose";
import config from "./config";

mongoose.set('strictQuery', { extends: false });

// Conexion String
(async () => {
  
  try {
    const db = await mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Conexion a base de datos Existosa!!: ', db.connection.name)

  } catch (error) {
    console.error(error);
  }

}
  )();