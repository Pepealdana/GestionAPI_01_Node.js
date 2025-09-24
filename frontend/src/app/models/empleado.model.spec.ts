import { Empleado } from './empleado.model';

describe('Empleado interface', () => {
  it('should create a valid empleado object', () => {
    const empleado: Empleado = {
      name: 'Juan Pérez',
      position: 'Desarrollador',
      salary: 3500,
      office: 'Bogotá'
    };

    expect(empleado).toBeTruthy();
    expect(empleado.name).toBe('Juan Pérez');
    expect(empleado.position).toBe('Desarrollador');
    expect(empleado.salary).toBeGreaterThan(0);
    expect(empleado.office).toBe('Bogotá');
  });
});
