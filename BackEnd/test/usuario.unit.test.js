// usuario.unit.test.js
const usuarioCtrl = require('../controllers/usuario.controller');
const Usuario = require('../models/usuario');

// Mock del modelo Usuario
jest.mock('../models/usuario');

describe('Pruebas unitarias de createUsuario', () => {
  
  // Limpiar mocks antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un usuario correctamente', async () => {
    const req = {
      body: {
        nombre: 'Carlos Gómez',
        email: 'carlos@test.com',
        telefono: '3001234567',
        rol: 'admin',
        password: '123456'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock de save
    Usuario.prototype.save.mockResolvedValue(req.body);

    await usuarioCtrl.createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'Usuario creado',
        usuario: req.body
      })
    );
  });

  it('debería fallar si falta un campo obligatorio', async () => {
    const req = { body: { nombre: 'Carlos Gómez' } }; // faltan otros campos
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await usuarioCtrl.createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Todos los campos son obligatorios.'
      })
    );
  });

  it('debería fallar si el correo es inválido', async () => {
    const req = {
      body: {
        nombre: 'Carlos Gómez',
        email: 'correo_invalido',
        telefono: '3001234567',
        rol: 'admin',
        password: '123456'
      }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await usuarioCtrl.createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'El formato del correo es inválido.'
      })
    );
  });

  it('debería fallar si el correo ya existe', async () => {
    const req = {
      body: {
        nombre: 'Carlos Gómez',
        email: 'carlos@test.com',
        telefono: '3001234567',
        rol: 'admin',
        password: '123456'
      }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Simular error de duplicado
    const error = new Error('Duplicado');
    error.code = 11000;
    error.keyPattern = { email: 1 };
    Usuario.prototype.save.mockRejectedValue(error);

    await usuarioCtrl.createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'El correo ya está registrado.'
      })
    );
  });

  it('debería manejar errores inesperados', async () => {
    const req = {
      body: {
        nombre: 'Carlos Gómez',
        email: 'carlos@test.com',
        telefono: '3001234567',
        rol: 'admin',
        password: '123456'
      }
    };

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Simular error genérico
    const error = new Error('Error inesperado');
    Usuario.prototype.save.mockRejectedValue(error);

    await usuarioCtrl.createUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Error al crear el usuario',
        detalle: 'Error inesperado'
      })
    );
  });
});
