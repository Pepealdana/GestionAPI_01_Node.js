// Módulo de rutas para Empleado
// ruta base `/api/empleados` y sus acciones específicas como crear, obtener, actualizar y eliminar empleados.
// ruta probada desde Postman

// Importamos express para usar su funcionalidad Router
const express = require('express');
const router = express.Router(); // usamos el enrutador de express

// Importamos el controlador de empleados, donde está la lógica del CRUD
const empleadoCtrl = require('../controllers/empleado.controller');

// Obtener todos los empleados
// Método: GET | URL: /api/empleados
router.get('/', empleadoCtrl.getEmpleados);

// Crear un nuevo empleado
// Método: POST | URL: /api/empleados
router.post('/', empleadoCtrl.createEmpleados);

// Obtener un empleado por su ID
// Método: GET | URL: /api/empleados/:id
router.get('/:id', empleadoCtrl.getUnicoEmpleado);

// Actualizar un empleado por su ID
// Método: PUT | URL: /api/empleados/:id
router.put('/:id', empleadoCtrl.editarEmpleado);

// Eliminar un empleado por su ID
// Método: DELETE | URL: /api/empleados/:id
router.delete('/:id', empleadoCtrl.eliminarEmpleado);

// Exportamos el módulo de rutas para que sea reconocido por el servidor
module.exports = router;