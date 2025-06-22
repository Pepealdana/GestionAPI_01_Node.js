// datos para Productos
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema para productos
const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

// Exportamos el modelo con el nombre 'Producto'
module.exports = mongoose.model('Producto', ProductoSchema);
