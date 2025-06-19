// datos para Usuarios
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema para usuarios
const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },      // Nombre del usuario
  email: { type: String, required: true, unique: true }, // Email único
  telefono: { type: String },                    // Teléfono del usuario
  rol: { type: String, default: 'usuario' }      // Rol del usuario (admin, usuario, etc.)
});

// Exportamos el modelo con el nombre 'Usuario'
module.exports = mongoose.model('Usuario', UsuarioSchema);
