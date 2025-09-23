// Controlador de usuarios
const Usuario = require('../models/usuario');
const usuarioCtrl = {};

// Obtener todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener los usuarios',
      detalle: error.message
    });
  }
};

// Obtener un único usuario por ID
usuarioCtrl.getUnicoUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el usuario',
      detalle: error.message
    });
  }
};

// Crear un nuevo usuario
usuarioCtrl.createUsuario = async (req, res) => {
  const { nombre, email, telefono, rol } = req.body;

  if (!nombre || !email || !telefono || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(email)) {
    return res.status(400).json({ error: 'El formato del correo es inválido.' });
  }

  try {
    const usuario = new Usuario({ nombre, email, telefono, rol });
    const nuevoUsuario = await usuario.save();

    res.status(201).json({
      status: 'Usuario creado',
      usuario: nuevoUsuario
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      res.status(400).json({ error: 'El correo ya está registrado.' });
    } else {
      res.status(500).json({
        error: 'Error al crear el usuario',
        detalle: err.message
      });
    }
  }
};

// Actualizar un usuario por ID
usuarioCtrl.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, rol } = req.body;

  if (!nombre || !email || !telefono || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(email)) {
    return res.status(400).json({ error: 'El formato del correo es inválido.' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente && usuarioExistente._id.toString() !== id) {
      return res.status(400).json({ error: 'El correo ya está registrado por otro usuario.' });
    }

    const usuarioEditado = { nombre, email, telefono, rol };

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { $set: usuarioEditado },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      status: 'Usuario actualizado',
      usuario
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error al actualizar el usuario',
      detalle: err.message
    });
  }
};

// Eliminar un usuario por ID
usuarioCtrl.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      status: 'Usuario eliminado',
      usuario
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar el usuario',
      detalle: error.message
    });
  }
};

module.exports = usuarioCtrl;
