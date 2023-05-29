// ---------------------------- Autorización
import jwt from "jsonwebtoken"; // Token
import config from "../config"; // Variables de entorno
import userSchema from "../models/user.models"; // Modelo de los usuarios
import role from "../models/role.models"; // Modelo de los roles admin, mod y user

// Verificar si se envia un token
export const verifyToken = async (req, res, next) => {
  // Recibimos el token
  const token = req.headers["x-access-token"];

  try {
    // Validar token
    if (!token)
      return res.status(403).json({
        message: "No hay un token",
      });

    // Traer lo que esta dentro del token
    const tokenVerified = jwt.verify(token, config.secret);
    req.userId = tokenVerified.id; // agregamos una propiedad req y guardamos el id del usuario

    // Validación de usuario
    const userRecived = await userSchema.findById(req.userId, { password: 0 }); // No retorna la contraseña, solo el hash
    if (!userRecived)
      return res.status(404).json({
        message: "El usuario no existe",
      });

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message || "Token invalido ó NO AUTORIZADO",
    });
  }
};

// Verifica si el usuario un moderador
export const isModerator = async (req, res, next) => {
  try {
    // Encuentra el usuario
    const user = await userSchema.findById(req.userId);

    // Busca todos los roles que coincidan con el id del usuario
    const Roles = await role.find({ _id: { $in: user.roles } });

    // Validacion si el rol del usuario es === moderator
    for (let i = 0; i < Roles.length; i++) {
      if (Roles[i].name === "moderator") {
        next(); // si se cumple la condicion deja lo seguir
        return;
      }
    }

    // Si se acaba el ciclo y nunca retorno entonces no se cumple la condicion de ser usuario moderador
    return res.status(403).json({
      message:
        "Operacion Denegada. El usuario no cuenta con los privilegios de Moderador",
    });
  } catch (error) {
    res.status(500).json({
      message: `Algo salio mal ${error}`,
    });
  }
};

// Verifica si el usuario es administrador
export const isAdmin = async (req, res, next) => {
  try {
    // Encuentra el usuario
    const user = await userSchema.findById(req.userId);

    // Busca todos los roles que coincidan con el id del usuario
    const Roles = await role.find({ _id: { $in: user.roles } });

    // Validacion si el rol del usuario es === admin
    for (let i = 0; i < Roles.length; i++) {
      if (Roles[i].name === "admin") {
        next(); // si se cumple la condicion deja lo seguir
        return;
      }
    }

    // Si se acaba el ciclo y nunca retorno entonces no se cumple la condicion de ser usuario administrador
    return res.status(403).json({
      message:
        "Operacion Denegada. El usuario no cuenta con los privilegios de Administrador",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
