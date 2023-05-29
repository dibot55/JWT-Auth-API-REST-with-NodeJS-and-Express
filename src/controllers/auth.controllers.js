import userSchema from "../models/user.models"; // importas el Schema
import jwt from "jsonwebtoken"; // JWT
import config from "../config"; // Variables de entorno
import role from "../models/role.models"; // roles

// SignUp - Registrarse
export const signUp = async (req, res) => {
  try {
    // Destructuración
    const { username, email, password, roles } = req.body;

    // Crear nuevo usuario
    const newUser = new userSchema({
      username,
      email,
      password: await userSchema.encryptPassword(password), // Hashear la contraseña
    });

    // Validación de roles
    if (roles) {
      // Si existe un rol en la peticion entonces asignale el id
      const foundRoles = await role.find({
        name: { $in: roles }, // Busca los roles de la peticion en los roles guardados en la bd por el nombre
      });
      newUser.roles = foundRoles.map((role) => role._id); // Retorna un arreglo con los _id de los roles asignados
      // Si el rol de la petición no coincide con los de la bd entonces te da un error
    } else {
      // Si no existe un rol en la peticion entonces le das "user" por defecto
      const roleDefault = await role.findOne({ name: "user" });
      newUser.roles = [roleDefault._id];
    }

    // Guardar usuario
    const userSaved = await newUser.save();
    console.log(userSaved);
    // Generar token (dato guardado dentro del token, palabra secreta con la que se genera el token, configuración)
    const jsonToken = jwt.sign({ id: userSaved._id }, config.secret, {
      expiresIn: 86400, // Expira en 24 horas
    });

    // Respuesta
    res.json({ jsonToken });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocurrio un Error al registrarse",
    });
  }
};

// SignIn - Iniciar Sesión
export const signIn = async (req, res) => {
  try {
    // Destructuración
    const { email, password } = req.body;

    // Validación de email
    const foundUser = await userSchema.findOne({ email }).populate("roles"); // hace referencia al schema roles desde la propiedad roles
    if (!foundUser) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    // Validación de contraseñas
    const matchPassword = await userSchema.comparePassword(
      password, // Contraseña proporcionada
      foundUser.password // Contraseña hasheada
    ); // True o False
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "La contraseña es incorrecta",
      });

    // Generar Token cada vez que se inicie sesion
    const jsonToken = jwt.sign({ id: foundUser._id }, config.secret, {
      expiresIn: 86400,
    });

    // Respuesta
    res.json({ jsonToken });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocurrio un error al iniciar sesion",
    });
  }
};
