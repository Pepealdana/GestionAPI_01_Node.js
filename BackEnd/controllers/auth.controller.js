// Controlador para autenticación (registro e inicio de sesión)
const Usuario = require('../models/usuario');
const authCtrl = {};

// Registrar nuevo usuario (ya lo tienes implementado)
authCtrl.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ error: 'El correo ya está registrado.' });
  }

  const nuevoUsuario = new Usuario({ nombre, email, password });
  await nuevoUsuario.save();
  res.json({ status: 'Usuario registrado correctamente' });
};

// Iniciar sesión (login)
authCtrl.login = async (req, res) => {
  const { email, password } = req.body;

  // Validar datos de entrada
  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }

  // Buscar usuario por email
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(404).json({ error: 'El correo no está registrado.' });
  }

  // Comparar contraseñas (sin encriptar por ahora)
  if (usuario.password !== password) {
    return res.status(401).json({ error: 'Contraseña incorrecta.' });
  }

  // Si todo está bien
  res.json({
    status: 'Inicio de sesión exitoso',
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  });
};

module.exports = authCtrl;
