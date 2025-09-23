// Controlador de servicios
const Servicio = require('../models/servicio');
const servicioCtrl = {};

// Obtener todos los servicios
servicioCtrl.getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener los servicios',
      detalle: error.message
    });
  }
};

// Crear un nuevo servicio
servicioCtrl.createServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio, disponible } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios.' });
    }

    const servicio = new Servicio({ nombre, descripcion, precio, disponible });
    const nuevoServicio = await servicio.save();

    res.status(201).json(nuevoServicio); // devolvemos el objeto creado
  } catch (error) {
    res.status(500).json({
      error: 'Error al guardar el servicio',
      detalle: error.message
    });
  }
};

// Obtener un único servicio por su ID
servicioCtrl.getUnicoServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el servicio',
      detalle: error.message
    });
  }
};

// Actualizar un servicio por su ID
servicioCtrl.editarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, disponible } = req.body;

    const servicio = await Servicio.findByIdAndUpdate(
      id,
      { $set: { nombre, descripcion, precio, disponible } },
      { new: true }
    );

    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.status(200).json(servicio); // devolvemos el objeto actualizado
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar el servicio',
      detalle: error.message
    });
  }
};

// Eliminar un servicio por su ID
servicioCtrl.eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);

    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.status(200).json({
      message: 'Servicio eliminado',
      servicio
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar el servicio',
      detalle: error.message
    });
  }
};

module.exports = servicioCtrl;
