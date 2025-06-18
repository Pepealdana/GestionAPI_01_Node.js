// Archivo de conexión a la base de datos MongoDB usando Mongoose.
// establece la conexión con en el archivo .env, por defecto se usa "empleados"

const mongoose = require('mongoose');            // Importamos Mongoose para conectarnos con MongoDB
require('dotenv').config();                      // Cargamos las variables de entorno del archivo .env

// URI de conexión extraída desde el archivo .env
const URI = process.env.MONGO_URI;

// Validación para asegurar que la URI exista
if (!URI) {
console.error('❌ MONGO_URI no está definido.');
process.exit(1); // Finaliza el proceso si no hay URI
}

// Intentamos conectar a MongoDB con Mongoose
mongoose.connect(URI)
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar MongoDB:', err));

// Exportamos mongoose para usar esta conexión en otros archivos
module.exports = mongoose;