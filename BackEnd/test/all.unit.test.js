// Archivo maestro de pruebas unitarias
// Ubicar en: BackEnd/test/all.unit.test.js

const usuarioCtrl = require('../controllers/usuario.controller');
const productoCtrl = require('../controllers/producto.controller');
const empleadoCtrl = require('../controllers/empleado.controller');
const servicioCtrl = require('../controllers/servicio.controller');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Empleado = require('../models/empleado');
const Servicio = require('../models/servicio');

// Mock de todos los modelos
jest.mock('../models/usuario');
jest.mock('../models/producto');
jest.mock('../models/empleado');
jest.mock('../models/servicio');

describe('Pruebas unitarias - Todos los módulos', () => {
  let res;

  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  // ------------------ USUARIOS ------------------
  describe('Usuarios', () => {
    it('crear usuario', async () => {
      const req = { body: { nombre: 'Carlos', email: 'c@test.com', telefono: '3001234567', rol: 'admin', password: '123456' } };
      Usuario.prototype.save.mockResolvedValue(req.body);
      await usuarioCtrl.createUsuario(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('obtener todos los usuarios', async () => {
      Usuario.find.mockResolvedValue([{ nombre: 'Carlos' }]);
      await usuarioCtrl.getUsuarios({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ------------------ PRODUCTOS ------------------
  describe('Productos', () => {
    it('crear producto', async () => {
      const req = { body: { nombre: 'Producto', descripcion: 'Desc', precio: 50 } };
      Producto.prototype.save.mockResolvedValue(req.body);
      await productoCtrl.createProducto(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('obtener todos los productos', async () => {
      Producto.find.mockResolvedValue([{ nombre: 'P1' }]);
      await productoCtrl.getProductos({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ------------------ EMPLEADOS ------------------
  describe('Empleados', () => {
    it('crear empleado', async () => {
      const req = { body: { nombre: 'Juan', cargo: 'Dev', salario: 2000 } };
      Empleado.prototype.save.mockResolvedValue(req.body);
      await empleadoCtrl.createEmpleado(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('obtener todos los empleados', async () => {
      Empleado.find.mockResolvedValue([{ nombre: 'E1' }]);
      await empleadoCtrl.getEmpleados({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ------------------ SERVICIOS ------------------
  describe('Servicios', () => {
    it('crear servicio', async () => {
      const req = { body: { nombre: 'Servicio', descripcion: 'Desc', precio: 100 } };
      Servicio.prototype.save.mockResolvedValue(req.body);
      await servicioCtrl.createServicio(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('obtener todos los servicios', async () => {
      Servicio.find.mockResolvedValue([{ nombre: 'S1' }]);
      await servicioCtrl.getServicios({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
