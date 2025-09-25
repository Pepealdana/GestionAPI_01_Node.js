import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpleadoService } from './empleado.service';
import { Empleado } from '../models/empleado.model';

describe('EmpleadoService', () => {
  let service: EmpleadoService;
  let httpMock: HttpTestingController;

const dummyEmpleado: Empleado = {
  _id: '123',
  name: 'Juan Pérez',
  position: 'Desarrollador',
  office: 'Bogotá',
  salary: 3000
};


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmpleadoService]
    });
    service = TestBed.inject(EmpleadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no queden requests pendientes
  });

  it('debería agregar un empleado', () => {
    service.agregarEmpleado(dummyEmpleado).subscribe((empleado) => {
      expect(empleado).toEqual(dummyEmpleado);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/empleados');
    expect(req.request.method).toBe('POST');
    req.flush(dummyEmpleado);
  });

  it('debería obtener empleados', () => {
    service.getEmpleados().subscribe((empleados) => {
      expect(empleados.length).toBe(1);
      expect(empleados).toEqual([dummyEmpleado]);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/empleados');
    expect(req.request.method).toBe('GET');
    req.flush([dummyEmpleado]);
  });
});
