// Controlador de empleados
// operaciones básicas de un CRUD: Crear, Leer, Actualizar y Eliminar
// se importa el modelo de Mongoose para acceder a la base de datos.

const Empleado = require('../models/empleado'); // Importamos el modelo de empleados
const empleadoCtrl = {}; // Creamos el objeto controlador para almacenar los métodos

// Obtener todos los empleados
// Método: GET
// Ruta: /api/empleados
empleadoCtrl.getEmpleados = async (req, res) => {
    const empleados = await Empleado.find(); // Busca todos los empleados en la colección
    res.json(empleados); // Envía la lista como respuesta en formato JSON
};

// Crear un nuevo empleado
// Método: POST
// Ruta: /api/empleados
empleadoCtrl.createEmpleados = async (req, res) => {
    const empleado = new Empleado(req.body); // Crea un nuevo objeto empleado desde el cuerpo de la solicitud
    await empleado.save(); // Guarda el empleado en la base de datos
    res.json({ status: 'Empleado guardado' }); // Envía un mensaje de éxito
};

// Obtener un único empleado por su ID
// Método: GET
// Ruta: /api/empleados/:id
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    const empleadoUnico = await Empleado.findById(req.params.id); // Busca el empleado por ID
    res.json(empleadoUnico); // Envía el empleado encontrado
};

// Actualizar un empleado por su ID.
// Método: PUT
// Ruta: /api/empleados/:id
empleadoCtrl.editarEmpleado = async (req, res) => {
    const { id } = req.params; // Se extrae el ID de los parámetros de la ruta

    // Se define un nuevo objeto con los datos actualizados del empleado
    const empleadoEditado = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        cargo: req.body.cargo
    };

    await Empleado.findByIdAndUpdate(id, { $set: empleadoEditado }, { new: true }); // Actualiza el empleado
    res.json({ status: 'Empleado Actualizado' }); // Mensaje de confirmación
};

// Eliminar un empleado por su ID.
// Método: DELETE
// Ruta: /api/empleados/:id
empleadoCtrl.eliminarEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.params.id); // Elimina el empleado por su ID
    res.json({ status: 'Empleado Eliminado' }); // Mensaje de confirmación
};

// Exportamos el controlador para ser usado en el módulo de rutas
module.exports = empleadoCtrl;