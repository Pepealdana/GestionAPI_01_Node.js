// Módulo de rutas para Usuario
const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
// const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/perfil', verifyToken, (req, res) => {
  res.json({
    mensaje: 'Acceso autorizado',
    datosUsuario: req.usuario
  });
});

// Obtener todos los usuarios
router.get('/', verifyToken, usuarioCtrl.getUsuarios);

// Crear nuevo usuario
router.post('/', usuarioCtrl.createUsuario);

// Obtener un usuario por ID
router.get('/:id', verifyToken, isAdmin, usuarioCtrl.editarUsuario);

// Actualizar usuario por ID
router.put('/:id', usuarioCtrl.editarUsuario);

// Eliminar usuario por ID
router.delete('/:id', verifyToken, isAdmin, usuarioCtrl.eliminarUsuario);

module.exports = router;