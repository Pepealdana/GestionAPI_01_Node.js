// Controlador de servicios
// operaciones básicas de un CRUD: Crear, Leer, Actualizar y Eliminar
// se importa el modelo de Mongoose para acceder a la base de datos.

const Servicio = require('../models/servicio'); // Importamos el modelo de servicios
const servicioCtrl = {}; // Creamos el objeto controlador para almacenar los métodos

// Obtener todos los servicios
// Método: GET
// Ruta: /api/servicios
servicioCtrl.getServicios = async (req, res) => {
    const servicios = await Servicio.find(); // Busca todos los servicios en la colección
    res.json(servicios); // Envía la lista como respuesta en formato JSON
};

// Crear un nuevo servicio
// Método: POST
// Ruta: /api/servicios
servicioCtrl.createServicio = async (req, res) => {
    const servicio = new Servicio(req.body); // Crea un nuevo objeto servicio desde el cuerpo de la solicitud
    await servicio.save(); // Guarda el servicio en la base de datos
    res.json({ status: 'Servicio guardado' }); // Envía un mensaje de éxito
};

// Obtener un único servicio por su ID
// Método: GET
// Ruta: /api/servicios/:id
servicioCtrl.getUnicoServicio = async (req, res) => {
    const servicioUnico = await Servicio.findById(req.params.id); // Busca el servicio por ID
    res.json(servicioUnico); // Envía el servicio encontrado
};

// Actualizar un servicio por su ID
// Método: PUT
// Ruta: /api/servicios/:id
servicioCtrl.editarServicio = async (req, res) => {
    const { id } = req.params; // Se extrae el ID de los parámetros de la ruta

    // Se define un nuevo objeto con los datos actualizados del servicio
    const servicioEditado = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        disponible: req.body.disponible
    };

    await Servicio.findByIdAndUpdate(id, { $set: servicioEditado }, { new: true }); // Actualiza el servicio
    res.json({ status: 'Servicio Actualizado' }); // Mensaje de confirmación
};

// Eliminar un servicio por su ID
// Método: DELETE
// Ruta: /api/servicios/:id
servicioCtrl.eliminarServicio = async (req, res) => {
    await Servicio.findByIdAndDelete(req.params.id); // Elimina el servicio por su ID
    res.json({ status: 'Servicio Eliminado' }); // Mensaje de confirmación
};

// Exportamos el controlador para ser usado en el módulo de rutas
module.exports = servicioCtrl;
