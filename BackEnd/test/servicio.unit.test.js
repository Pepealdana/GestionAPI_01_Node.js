const servicioCtrl = require('../controllers/servicio.controller');
const Servicio = require('../models/servicio');

jest.mock('../models/servicio');

describe('Pruebas unitarias de createServicio', () => {
  it('debería crear un servicio correctamente', async () => {
    const req = {
      body: {
        nombre: 'Servicio Test',
        descripcion: 'Descripción del servicio',
        precio: 100
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Servicio.prototype.save.mockResolvedValue(req.body);

    await servicioCtrl.createServicio(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Servicio creado',
        servicio: req.body
      })
    );
  });

  it('debería fallar si falta un campo obligatorio', async () => {
    const req = { body: { nombre: '', descripcion: '', precio: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await servicioCtrl.createServicio(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Todos los campos son obligatorios.'
      })
    );
  });
});
