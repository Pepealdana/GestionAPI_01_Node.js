import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit, AfterViewInit {
  empleado: Empleado = this.getEmpleadoVacio();

  empleados: MatTableDataSource<Empleado> = new MatTableDataSource<Empleado>();
  columnasTabla: string[] = ['name', 'position', 'office', 'salary', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
  private empleadoService: EmpleadoService,
  private snackBar: MatSnackBar
) {}



  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  ngAfterViewInit(): void {
    this.empleados.paginator = this.paginator;
    this.empleados.sort = this.sort;
  }

  obtenerEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data: Empleado[]) => {
        this.empleados.data = data;
        if (this.empleados.paginator) this.empleados.paginator.firstPage();
      },
      error: (err) => console.error('Error al obtener empleados:', err)
    });
  }

  guardarEmpleado(): void {
    if (!this.esFormularioValido()) {
      console.warn('Por favor completa todos los campos correctamente.');
      return;
    }

    const operacion = this.empleado._id
      ? this.empleadoService.actualizarEmpleado(this.empleado._id, this.empleado)
      : this.empleadoService.crearEmpleado(this.empleado);

    operacion.subscribe({
      next: () => {
        this.obtenerEmpleados();
        this.limpiarFormulario();
      },
      error: (err) => console.error('Error al guardar/actualizar:', err)
    });
  }

  eliminarEmpleado(id: string): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => this.obtenerEmpleados(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  editarEmpleado(empleado: Empleado): void {
    this.empleado = { ...empleado };
  }

  limpiarFormulario(): void {
    this.empleado = this.getEmpleadoVacio();
  }

  private getEmpleadoVacio(): Empleado {
    return {
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }

  private esFormularioValido(): boolean {
    return (
      this.empleado.name.trim() !== '' &&
      this.empleado.position.trim() !== '' &&
      this.empleado.office.trim() !== '' &&
      this.empleado.salary > 0
    );
  }
}
