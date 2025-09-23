// modelo para Usuarios
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema para usuarios
const UsuarioSchema = new Schema({
  nombre: { 
    type: String, 
    required: true // Nombre obligatorio
  },
  email: { 
    type: String, 
    required: true, // Email obligatorio
    unique: true    // Email único
  },
  telefono: { 
    type: String    // Teléfono opcional
  },
  rol: { 
    type: String, 
    default: 'usuario' // Rol por defecto: usuario
  },
  password: { 
    type: String, 
    required: true // Contraseña obligatoria
  }
}, { 
  timestamps: true // Crea createdAt y updatedAt automáticamente
});

// Exportamos el modelo 'Usuario' para usarlo en el controlador
module.exports = mongoose.model('Usuario', UsuarioSchema);
