// Módulo de rutas para Servicio
// ruta base `/api/servicios` y sus acciones específicas como crear, obtener, actualizar y eliminar servicios
// ruta probada desde Postman

// Importamos express para usar su funcionalidad Router
const express = require('express');
const router = express.Router(); // usamos el enrutador de express

// Importamos el controlador de servicios, donde está la lógica del CRUD
const servicioCtrl = require('../controllers/servicio.controller');

// Obtener todos los servicios
// Método: GET | URL: /api/servicios
router.get('/', servicioCtrl.getServicios);

// Crear un nuevo servicio
// Método: POST | URL: /api/servicios
router.post('/', servicioCtrl.createServicio);

// Obtener un servicio por su ID
// Método: GET | URL: /api/servicios/:id
router.get('/:id', servicioCtrl.getUnicoServicio);

// Actualizar un servicio por su ID
// Método: PUT | URL: /api/servicios/:id
router.put('/:id', servicioCtrl.editarServicio);

// Eliminar un servicio por su ID
// Método: DELETE | URL: /api/servicios/:id
router.delete('/:id', servicioCtrl.eliminarServicio);

// Exportamos el módulo de rutas para que sea reconocido por el servidor
module.exports = router;
