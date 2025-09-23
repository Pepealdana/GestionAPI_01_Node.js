// Controlador de empleados
const Empleado = require('../models/empleado');
const empleadoCtrl = {};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados', detalle: error.message });
  }
};

// Crear un nuevo empleado
empleadoCtrl.createEmpleados = async (req, res) => {
  try {
    const { name, position, office, salary } = req.body;

    if (!name || !position || !office || !salary) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const empleado = new Empleado({ name, position, office, salary });
    await empleado.save();
    res.status(201).json(empleado); // 201 y objeto creado
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el empleado', detalle: error.message });
  }
};

// Obtener un único empleado por ID
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado', detalle: error.message });
  }
};

// Actualizar un empleado por ID
empleadoCtrl.editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoEditado = {
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
    };

    const empleado = await Empleado.findByIdAndUpdate(id, { $set: empleadoEditado }, { new: true });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado); // devolvemos empleado actualizado
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado', detalle: error.message });
  }
};

// Eliminar un empleado por ID
empleadoCtrl.eliminarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.status(200).json({ status: 'Empleado eliminado', empleado });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado', detalle: error.message });
  }
};

module.exports = empleadoCtrl;
