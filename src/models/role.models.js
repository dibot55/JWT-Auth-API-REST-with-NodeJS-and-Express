import { Schema, model } from "mongoose";

export const ROLES = ["user", "admin", "moderator"]

// Estructura de los datos de la coleccion "role" para user, moderator y admin
const roleSchema = new Schema({
  name: String
}, {
  versionKey: false
});

export default model('role', roleSchema);