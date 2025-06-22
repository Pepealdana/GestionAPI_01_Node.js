// Controlador de productos
const Producto = require('../models/producto');
const productoCtrl = {};

// Obtener todos los productos
productoCtrl.getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

// Crear producto con validaciones
productoCtrl.createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios.' });
  }

  try {
    const producto = new Producto({ nombre, descripcion, precio, stock });
    await producto.save();
    res.json({ status: 'Producto creado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el producto', detalle: err.message });
  }
};

// Obtener producto por ID
productoCtrl.getUnicoProducto = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.json(producto);
};

// Editar producto por ID
productoCtrl.editarProducto = async (req, res) => {
  const { id } = req.params;
  const editado = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  };

  await Producto.findByIdAndUpdate(id, { $set: editado }, { new: true });
  res.json({ status: 'Producto actualizado' });
};

// Eliminar producto por ID
productoCtrl.eliminarProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ status: 'Producto eliminado' });
};

module.exports = productoCtrl;
