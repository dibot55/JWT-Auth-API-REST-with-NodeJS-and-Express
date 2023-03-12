import productsModels from "../models/products.models"; // product models

// ---------------------------------- Product Routes Controllers

// Create
export const createProducts = async (req, res) => {

  try {
    // Destructuración
    const { name, category, price, imgURL } = req.body;

    // Nuevo Producto
    const newProduct = new productsModels({
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
        message: error.message || "Error creando el producto"
      });
  }

};

// Read
export const readProducts = async (req, res) => {

  try {
    // TODOS los Productos
    const productsFind = await productsModels.find().lean();

    res.json(productsFind);

  } catch (error) {
    res.status(500).json({
      message: error.message || `Error recibiendo los productos`
    });
  }

};

// Read by id
export const readProductsById = async (req, res) => {

  try {
    // Encuentra por id
    const productsId= await productsModels.findById(req.params.productid)

    // Validación
    if(!productsId){
      res.status(404).json({
        message: `El contenido no existe: ${req.params.productid}`
      });
    }

    // Respuesta
    res.json(productsId);

  } catch (error) {
    res.status(500).json({
      message: error.message || `Error devolviendo el contenido ${req.params.productid}`
    });
  }
  
};

// Update
export const updateProducts = async (req, res) => {

  try {
    
    // Actualizar un producto por ID
    await productsModels.findByIdAndUpdate(req.params.productid, req.body, {
      new: true // Para que mongoose devuelva los datos actualizados
    });

    // Respuesta
    res.status(204).json();

  } catch (error) {
    req.status(500).json({
      message: error.message || `Algo salio mal actualizando el producto: ${req.params.productid}`
    });
  }

};

// Delete
export const deleteProducts = async(req, res) => {

  try {
    // Eliminar un producto por id
    await productsModels.findByIdAndDelete(req.params.productid);
    
    // Respuesta
    res.status(204).json();

  } catch (error) {
    res.status(500).json({
      message: error.message || `Algo salio mal eliminando: ${req.params.productid}`
    });
  }

};
