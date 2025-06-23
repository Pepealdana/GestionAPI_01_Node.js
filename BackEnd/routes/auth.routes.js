// Rutas del módulo de autenticación
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

// Registrar nuevo usuario
router.post('/register', authCtrl.register);

// Iniciar sesión
router.post('/login', authCtrl.login);

module.exports = router;
