const empleadoCtrl = require('../controllers/empleado.controller');
const Empleado = require('../models/empleado');

jest.mock('../models/empleado');

describe('Pruebas unitarias de createEmpleado', () => {
  it('debería crear un empleado correctamente', async () => {
    const req = {
      body: {
        nombre: 'Empleado Test',
        cargo: 'Programador',
        salario: 2000
      }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Empleado.prototype.save.mockResolvedValue(req.body);

    await empleadoCtrl.createEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Empleado creado',
        empleado: req.body
      })
    );
  });

  it('debería fallar si falta un campo obligatorio', async () => {
    const req = { body: { nombre: '', cargo: '', salario: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await empleadoCtrl.createEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Todos los campos son obligatorios.'
      })
    );
  });
});
