import { Schema, model } from "mongoose";

// Estructura de los datos para la coleccion "products"
const productsSchema = new Schema ({
  name: {
    type: String,
    trim: true, // Quita los espacios al inicio y al final de la cadena de texto
    require: true
  },
  category: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    trim: true
  },
  imgURL: String
}, {
  timestamps: true, // Update_at / Created_at
  versionKey: false 
});

// Query para la "tabla" / colección model
export default model('product', productsSchema);