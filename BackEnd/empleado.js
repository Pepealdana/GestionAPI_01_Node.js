// estructura de los documentos que se guardan en MongoDB usando Mongoose
// Cada empleado tendrá información básica como nombre, cargo, oficina y salario.

const mongoose = require('mongoose');
const { Schema } = mongoose;

// esquema para empleados
const EmpleadoSchema = new Schema({
  name: { type: String, required: true },      // Nombre del empleado
  position: { type: String, required: true },  // Cargo u ocupación
  office: { type: String, required: true },    // Sede u oficina donde trabaja
  salary: { type: Number, required: true }     // Salario o sueldo
});

//Exportamos el modelo con el nombre 'Empleado'
//MongoDB lo interpretará como la colección 'empleados'
module.exports = mongoose.model('Empleado', EmpleadoSchema);