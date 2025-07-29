// Módulo de rutas para Usuario
const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

// 🔧 Middleware de autenticación temporalmente desactivado
// const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

// Ruta para obtener el perfil del usuario autenticado
// ⚠️ Auth deshabilitada temporalmente para pruebas
// router.get('/perfil', verifyToken, (req, res) => {
router.get('/perfil', (req, res) => {
  res.json({
    mensaje: 'Acceso autorizado (sin token por ahora)',
    datosUsuario: {
      nombre: 'Usuario de prueba',
      rol: 'usuario'
    }
  });
});

// Obtener todos los usuarios
// router.get('/', verifyToken, usuarioCtrl.getUsuarios);
router.get('/', usuarioCtrl.getUsuarios); // 🔓 auth desactivada

// Crear nuevo usuario
router.post('/', usuarioCtrl.createUsuario);

// Obtener un usuario por ID
// router.get('/:id', verifyToken, isAdmin, usuarioCtrl.editarUsuario);
router.get('/:id', usuarioCtrl.editarUsuario); // 🔓 auth desactivada

// Actualizar usuario por ID
router.put('/:id', usuarioCtrl.editarUsuario);

// Eliminar usuario por ID
// router.delete('/:id', verifyToken, isAdmin, usuarioCtrl.eliminarUsuario);
router.delete('/:id', usuarioCtrl.eliminarUsuario); // 🔓 auth desactivada

module.exports = router;
