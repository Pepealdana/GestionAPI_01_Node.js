import { Component } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  empleado: Empleado = {
    nombre: '',
    cargo: '',
    oficina: '',
    salario: 0
  };

  constructor(private empleadoService: EmpleadoService) {}

  guardarEmpleado() {
    this.empleadoService.agregarEmpleado(this.empleado);
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.empleado = {
      nombre: '',
      cargo: '',
      oficina: '',
      salario: 0
    };
  }
}
