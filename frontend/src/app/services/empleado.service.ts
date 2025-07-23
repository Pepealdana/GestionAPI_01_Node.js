import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  empleados: Empleado[] = [];

  agregarEmpleado(empleado: Empleado) {
    this.empleados.push({ ...empleado });
  }

  obtenerEmpleados(): Empleado[] {
    return this.empleados;
  }

  limpiarEmpleados() {
    this.empleados = [];
  }
}
