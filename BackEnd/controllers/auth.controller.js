// Controlador para autenticación (registro e inicio de sesión)
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authCtrl = {};

// REGISTRO
authCtrl.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verifica si ya existe un usuario con ese nombre o correo
    const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { nombre }] });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El nombre o correo ya están registrados.' });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear y guardar el usuario
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();

    // Crear token
    const token = jwt.sign(
      { id: nuevoUsuario._id, nombre: nuevoUsuario.nombre, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET || 'secreto_temporal',
      { expiresIn: '2h' }
    );

    res.status(201).json({
      status: 'Usuario registrado correctamente',
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al registrar', detalle: err.message });
  }
};

// LOGIN
authCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: 'Correo no registrado.' });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_temporal',
      { expiresIn: '2h' }
    );

    res.status(200).json({
      status: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al iniciar sesión', detalle: err.message });
  }
};

module.exports = authCtrl;
