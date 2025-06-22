// Rutas para productos
const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/producto.controller');

router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getUnicoProducto);
router.put('/:id', productoCtrl.editarProducto);
router.delete('/:id', productoCtrl.eliminarProducto);

module.exports = router;
