// datos para Servicios
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema para servicios
const ServicioSchema = new Schema({
  nombre: { type: String, required: true },       // Nombre del servicio o producto
  descripcion: { type: String, required: true },  // Descripción general del servicio
  precio: { type: Number, required: true },       // Costo del servicio en pesos
  disponible: { type: Boolean, default: true }    // Estado del servicio: disponible o no
});

// Exportamos el modelo con el nombre 'Servicio', MongoDB lo interpretará como la colección 'servicios'
module.exports = mongoose.model('Servicio', ServicioSchema);
