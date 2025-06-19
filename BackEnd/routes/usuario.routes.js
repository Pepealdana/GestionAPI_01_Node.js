// Módulo de rutas para Usuario
const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

// Obtener todos los usuarios
router.get('/', usuarioCtrl.getUsuarios);

// Crear nuevo usuario
router.post('/', usuarioCtrl.createUsuario);

// Obtener un usuario por ID
router.get('/:id', usuarioCtrl.getUnicoUsuario);

// Actualizar usuario por ID
router.put('/:id', usuarioCtrl.editarUsuario);

// Eliminar usuario por ID
router.delete('/:id', usuarioCtrl.eliminarUsuario);

module.exports = router;
