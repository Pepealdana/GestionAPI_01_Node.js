/**

*

* creamos un módulo por eso utilizamos express

*/

const express = require('express');

const router = express.Router();

const empleadoCtrl = require('../controllers/empleado.controller');

router.get('/', empleadoCtrl.getEmpleados); // Rutas más limpias (obtener empleados)

router.post('/', empleadoCtrl.createEmpleados);//guardar

router.get('/:id', empleadoCtrl.getUnicoEmpleado);// obtiene un único empleado

router.put('/:id',empleadoCtrl.editarEmpleado); //Actualizar datos (uno a la vez)

router.delete('/:id', empleadoCtrl.eliminarEmpleado);

module.exports = router;