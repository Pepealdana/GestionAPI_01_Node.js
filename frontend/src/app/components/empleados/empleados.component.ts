import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleado: Empleado = {
    name: '',
    position: '',
    office: '',
    salary: 0
  };

  empleados: Empleado[] = [];

  columnasTabla: string[] = ['name', 'position', 'office', 'salary', 'acciones'];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  guardarEmpleado() {
    const operacion = this.empleado._id
      ? this.empleadoService.actualizarEmpleado(this.empleado._id, this.empleado)
      : this.empleadoService.agregarEmpleado(this.empleado);

    operacion.subscribe({
      next: () => {
        this.obtenerEmpleados();
        this.limpiarFormulario();
      },
      error: (err: any) => {
        console.error('Error al guardar/actualizar:', err);
      }
    });
  }

  obtenerEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (data: Empleado[]) => {
        this.empleados = data;
      },
      error: (err: any) => {
        console.error('Error al obtener empleados:', err);
      }
    });
  }

  eliminarEmpleado(id: string) {
    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => this.obtenerEmpleados(),
      error: (err: any) => console.error('Error al eliminar:', err)
    });
  }

  editarEmpleado(empleado: Empleado) {
    this.empleado = { ...empleado }; // Clonamos el objeto con _id incluido
  }

  limpiarFormulario() {
    this.empleado = {
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }
}
