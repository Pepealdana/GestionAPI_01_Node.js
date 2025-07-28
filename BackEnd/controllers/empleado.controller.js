const Empleado = require('../models/empleado'); // Modelo de empleados
const empleadoCtrl = {}; // Objeto controlador

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

// Crear un nuevo empleado
empleadoCtrl.createEmpleados = async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.json({ status: 'Empleado guardado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el empleado' });
  }
};

// Obtener un único empleado por ID
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    res.json(empleado);
  } catch (error) {
    res.status(404).json({ error: 'Empleado no encontrado' });
  }
};

// Actualizar un empleado por ID
empleadoCtrl.editarEmpleado = async (req, res) => {
  const { id } = req.params;

  const empleadoEditado = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };

  try {
    await Empleado.findByIdAndUpdate(id, { $set: empleadoEditado }, { new: true });
    res.json({ status: 'Empleado actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Eliminar un empleado por ID
empleadoCtrl.eliminarEmpleado = async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ status: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

module.exports = empleadoCtrl;
