// Controlador de productos
const Producto = require('../models/producto');
const productoCtrl = {};

// Obtener todos los productos
productoCtrl.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', detalle: error.message });
  }
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
    res.status(201).json(producto); // ahora devuelve 201 y el producto creado
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el producto', detalle: err.message });
  }
};

// Obtener producto por ID
productoCtrl.getUnicoProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', detalle: error.message });
  }
};

// Editar producto por ID
productoCtrl.editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const editado = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
    };

    const producto = await Producto.findByIdAndUpdate(id, { $set: editado }, { new: true });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(producto); // devolvemos el producto actualizado
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', detalle: error.message });
  }
};

// Eliminar producto por ID
productoCtrl.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ status: 'Producto eliminado', producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto', detalle: error.message });
  }
};

module.exports = productoCtrl;
