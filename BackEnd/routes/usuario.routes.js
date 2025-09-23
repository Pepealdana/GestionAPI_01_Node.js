// Módulo de rutas para Usuario
const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

// 🔧 Middlewares de autenticación y permisos (temporalmente desactivados)
// const verifyToken = require('../middlewares/verifyToken');
// const isAdmin = require('../middlewares/isAdmin');

/**
 * Ruta: GET /api/usuarios/perfil
 * Descripción: Obtener el perfil del usuario autenticado
 * Nota: Auth deshabilitada temporalmente para pruebas
 */
router.get('/perfil', (req, res) => {
  res.json({
    mensaje: 'Acceso autorizado (sin token por ahora)',
    datosUsuario: {
      nombre: 'Usuario de prueba',
      rol: 'usuario'
    }
  });
});

/**
 * Ruta: GET /api/usuarios
 * Descripción: Obtener todos los usuarios
 */
router.get('/', usuarioCtrl.getUsuarios);

/**
 * Ruta: GET /api/usuarios/:id
 * Descripción: Obtener un usuario por ID
 */
router.get('/:id', usuarioCtrl.getUsuario);

/**
 * Ruta: POST /api/usuarios
 * Descripción: Crear un nuevo usuario
 */
router.post('/', usuarioCtrl.createUsuario);

/**
 * Ruta: PUT /api/usuarios/:id
 * Descripción: Actualizar un usuario por ID
 */
router.put('/:id', usuarioCtrl.editarUsuario);

/**
 * Ruta: DELETE /api/usuarios/:id
 * Descripción: Eliminar un usuario por ID
 */
router.delete('/:id', usuarioCtrl.eliminarUsuario);

module.exports = router;
