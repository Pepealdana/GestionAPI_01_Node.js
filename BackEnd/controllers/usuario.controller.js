// Controlador de usuarios
// CRUD básico: Crear, Leer, Actualizar y Eliminar
const Usuario = require('../models/usuario');
const usuarioCtrl = {}; // Objeto que agrupa todas las funciones

// Obtener todos los usuarios
// Método: GET | Ruta: /api/usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Obtener un único usuario por ID
// Método: GET | Ruta: /api/usuarios/:id
usuarioCtrl.getUnicoUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

// Crear un nuevo usuario con validación
// Método: POST | Ruta: /api/usuarios
usuarioCtrl.createUsuario = async (req, res) => {
  const { nombre, email, telefono, rol } = req.body;

  // Validación de campos vacíos
  if (!nombre || !email || !telefono || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar formato del correo electrónico
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(email)) {
    return res.status(400).json({ error: 'El formato del correo es inválido.' });
  }

  try {
    const usuario = new Usuario({ nombre, email, telefono, rol });
    await usuario.save();
    res.json({ status: 'Usuario creado' });
  } catch (err) {
    // Si el correo ya está registrado
    if (err.code === 11000 && err.keyPattern?.email) {
      res.status(400).json({ error: 'El correo ya está registrado.' });
    } else {
      res.status(500).json({ error: 'Error al crear el usuario', detalle: err.message });
    }
  }
};

// Actualizar un usuario por ID con validaciones
// Método: PUT | Ruta: /api/usuarios/:id
usuarioCtrl.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, rol } = req.body;

  // Validación de campos vacíos
  if (!nombre || !email || !telefono || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Validar formato del correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(email)) {
    return res.status(400).json({ error: 'El formato del correo es inválido.' });
  }

  try {
    // Verificar si el correo ya está en uso por otro usuario
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente && usuarioExistente._id.toString() !== id) {
      return res.status(400).json({ error: 'El correo ya está registrado por otro usuario.' });
    }

    const usuarioEditado = { nombre, email, telefono, rol };

    await Usuario.findByIdAndUpdate(id, { $set: usuarioEditado }, { new: true });
    res.json({ status: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario', detalle: err.message });
  }
};

// Eliminar un usuario por ID
// Método: DELETE | Ruta: /api/usuarios/:id
usuarioCtrl.eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ status: 'Usuario eliminado' });
};

// Exportamos el controlador
module.exports = usuarioCtrl;
