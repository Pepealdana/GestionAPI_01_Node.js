import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleado: Empleado = {
    nombre: '',
    cargo: '',
    oficina: '',
    salario: 0
  };

  empleados = new MatTableDataSource<Empleado>();
  columnasTabla: string[] = ['nombre', 'cargo', 'oficina', 'salario', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (data: Empleado[]) => {
        console.log('Datos obtenidos:', data);
        this.empleados.data = data;
        this.empleados.paginator = this.paginator;
        this.empleados.sort = this.sort;
      },
      error: (err) => console.error('Error al obtener empleados:', err)
    });
  }

  guardarEmpleado() {
    if (this.empleado._id) {
      this.empleadoService.actualizarEmpleado(this.empleado._id, this.empleado).subscribe({
        next: () => {
          this.obtenerEmpleados();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.empleadoService.agregarEmpleado(this.empleado).subscribe({
        next: () => {
          this.obtenerEmpleados();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }

  eliminarEmpleado(id: string) {
    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => this.obtenerEmpleados(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  editarEmpleado(empleado: Empleado) {
    this.empleado = { ...empleado };
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
