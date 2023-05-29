// Valida si un rol exite o no al momento de registrarse
import { ROLES } from "../models/role.models";
import userSchema from "../models/user.models";

export const checkUserExisted = async (req, res, next) => {
  try {
    // Encontar usuario existente
    const userFound = await userSchema.findOne({ username: req.body.username });
    // Validar si el usuario existe
    if(userFound) return res.status(400).json({
      message: "El usuario ya existe"
    });

    //Encontrar el Email
    const emailFound = await userSchema.findOne({ email: req.body.email });
    if(emailFound) return res.status(400).json({
      message: "El email ya existe"
    });

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

};

export const checkRolesExisted = async (req, res, next) => {
  
  // Validacion si el rol esta en la solicitud
  if(!req.body.roles) return res.status(400).json({
    message: "No hay roles definidos"
  });

  // Validacion si el rol existe
    for(let i = 0; i < req.body.roles.length; i++){

      if(!ROLES.includes(req.body.roles[i])){
        return res.status(400).json({
          message: `El rol ${req.body.roles[i]} no existe`
        });
      };

    };

  next();

}; 
