// Controlador de usuarios
// CRUD básico: Crear, Leer, Actualizar y Eliminar
const Usuario = require('../models/usuario');
const usuarioCtrl = {};

// Obtener todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Crear un nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json({ status: 'Usuario creado' });
};

// Obtener un único usuario por ID
usuarioCtrl.getUnicoUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

// Actualizar un usuario por ID
usuarioCtrl.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuarioEditado = {
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    rol: req.body.rol
  };
  await Usuario.findByIdAndUpdate(id, { $set: usuarioEditado }, { new: true });
  res.json({ status: 'Usuario actualizado' });
};

// Eliminar un usuario por ID
usuarioCtrl.eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ status: 'Usuario eliminado' });
};

module.exports = usuarioCtrl;

// Crear un nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({ status: 'Usuario creado' });
  } catch (err) {
    // Si el error es de duplicado de email
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      res.status(400).json({ error: 'El correo ya está registrado.' });
    } else {
      // Cualquier otro error
      res.status(500).json({ error: 'Error al crear el usuario', detalle: err.message });
    }
  }
};
