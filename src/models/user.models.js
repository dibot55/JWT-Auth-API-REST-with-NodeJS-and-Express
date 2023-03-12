import { Schema, model } from "mongoose"; // mongoose
import bcrypt from "bcryptjs"; // modulo para encriptar las contraseñas

// Estructura de los datos de la coleccion "users"
const userSchema = new Schema(
{
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    ref: "role", // con "ref" hacemos referencia a otro modelo. En este caso al de role.module.js
    type: Schema.Types.ObjectId // Hacemos referencia al modelo de los datos con el ID
  }]
},{
  timestamps: true,
  versionKey: false
});

// -------------------------------------- Metodos para cifrar contraseñas

// userSchema.methods.encryptPassword = async (password) => {}; -------> este metodo instancia nuevos objetos al llamarlos
// userSchema.statics.encryptPassword = async (password) => {}; -------> crea metodos estaticos que llaman objetos sin instanciarlos 

// Encriptar las contraseñas con hash
userSchema.statics.encryptPassword = async (password) => {
  // Generar Sal para hashear las contraseñas
  const salt = await bcrypt.genSaltSync(10);

  // Retorna la contraseña hasheada
  return await bcrypt.hashSync(password, salt);
};

// Comparar los hashes de las contraseñas (password que da el usuario al iniciar sesión ,password almacenado)
userSchema.statics.comparePassword = async (receivedpassword, Password) => {
  // Comparar contraseñas hasehadas
  return await bcrypt.compareSync(receivedpassword, Password);
};

// """""Query"""""
export default model('user',userSchema);