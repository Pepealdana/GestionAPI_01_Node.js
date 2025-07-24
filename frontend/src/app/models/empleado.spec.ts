import { Empleado } from './empleado';

describe('Empleado interface', () => {
  it('should create a valid empleado object', () => {
    const empleado: Empleado = {
      nombre: 'Juan Pérez',
      cargo: 'Desarrollador',
      salario: 3500,
      oficina: ''
    };

    expect(empleado).toBeTruthy();
    expect(empleado.nombre).toBe('Juan Pérez');
    expect(empleado.cargo).toBe('Desarrollador');
    expect(empleado.salario).toBeGreaterThan(0);
  });
});
