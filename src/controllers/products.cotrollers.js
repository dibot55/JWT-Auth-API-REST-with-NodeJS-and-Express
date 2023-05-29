import productSchema from "../models/products.models"; // product models

// ---------------------------------- Product Routes Controllers

// Create
export const createProducts = async (req, res) => {
  try {
    // Destructuración
    const { name, category, price, imgURL } = req.body;

    // Nuevo Producto
    const newProduct = new productSchema({
      name,
      category,
      price,
      imgURL,
    });

    // Guardar
    const productSaved = await newProduct.save();

    // Response
    res.status(201).json(productSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error creando el producto",
    });
  }
};

// Read
export const readProducts = async (req, res) => {
  try {
    // TODOS los Productos
    const productsFind = await productSchema.find().lean();

    res.json(productsFind);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error recibiendo los productos`,
    });
  }
};

// Read by id
export const readProductsById = async (req, res) => {
  try {
    // Encuentra por id
    const productsId = await productSchema.findById(req.params.productid);

    // Validación
    if (!productsId) {
      res.status(404).json({
        message: `El contenido no existe: ${req.params.productid}`,
      });
    }

    // Respuesta
    res.json(productsId);
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        `El id: ${req.params.productid} es invalido o no existe`,
    });
  }
};

// Update
export const updateProducts = async (req, res) => {
  try {
    // Actualizar un producto por ID
    await productSchema.findByIdAndUpdate(req.params.productid, req.body, {
      new: true, // Para que mongoose devuelva los datos actualizados
    });

    // Respuesta
    res.status(204).json();
  } catch (error) {
    req.status(500).json({
      message:
        error.message ||
        `Algo salio mal actualizando el producto: ${req.params.productid}`,
    });
  }
};

// Delete
export const deleteProducts = async (req, res) => {
  try {
    // Eliminar un producto por id
    await productSchema.findByIdAndDelete(req.params.productid);

    // Respuesta
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      message:
        error.message || `Error al eliminar: ${req.params.productid}`,
    });
  }
};
