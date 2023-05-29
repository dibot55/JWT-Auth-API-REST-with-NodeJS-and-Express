import role from "../models/role.models"; // Roles

// --------------------------- Crear Roles antes de que se ejecute el servidor

export const createRoles = async () => {

  try {
    
    // Cuenta si ya existen documentos
    const count = await role.estimatedDocumentCount();

    // Validación si hay roles entonces bloquea el codigo siguiente retornando
    if(count > 0) return;

    // Roles
    const values = await Promise.all([ // Ejecuta las promesas al mismo tiempo
    new role({ name: 'user' }).save(),
    new role({ name: 'moderator' }).save(),
    new role({ name: 'admin' }).save()
  ]);

  console.log(values);
  } catch (error) {
    console.error(`Ha ocurrido un error al crear los roles. Revisa tu conexion a MongoDB ${error}`);
  }
}

