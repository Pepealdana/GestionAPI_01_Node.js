import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleado: Empleado = {
    name: '',
    position: '',
    office: '',
    salary: 0
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (res) => (this.empleados = res),
      error: (err) => console.error(err)
    });
  }

guardarEmpleado(): void {
  const operacion = this.empleado._id
    ? this.empleadoService.actualizarEmpleado(this.empleado._id, this.empleado)
    : this.empleadoService.crearEmpleado(this.empleado);

  operacion.subscribe({
    next: () => {
      this.obtenerEmpleados();
      this.resetForm();
    },
    error: (err: any) => console.error('Error en guardarEmpleado:', err)
  });
}

  editarEmpleado(empleado: Empleado): void {
    this.empleado = { ...empleado }; // copiamos para evitar referencias directas
  }

  eliminarEmpleado(id: string | undefined): void {
    if (!id) return;
    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => this.obtenerEmpleados(),
      error: (err) => console.error(err)
    });
  }

  resetForm(): void {
    this.empleado = {
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }
}
