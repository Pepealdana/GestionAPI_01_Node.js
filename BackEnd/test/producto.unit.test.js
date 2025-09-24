const productoCtrl = require('../controllers/producto.controller');
const Producto = require('../models/producto');

jest.mock('../models/producto');

describe('Pruebas unitarias de createProducto', () => {
  it('debería crear un producto correctamente', async () => {
    const req = {
      body: {
        nombre: 'Producto Test',
        descripcion: 'Descripción del producto',
        precio: 50
      }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Producto.prototype.save.mockResolvedValue(req.body);

    await productoCtrl.createProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Producto creado',
        producto: req.body
      })
    );
  });

  it('debería fallar si falta un campo obligatorio', async () => {
    const req = { body: { nombre: '', descripcion: '', precio: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await productoCtrl.createProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Todos los campos son obligatorios.'
      })
    );
  });
});
