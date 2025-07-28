import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[] = [];

  columnasTabla: string[] = ['nombre', 'descripcion', 'precio', 'disponible', 'acciones'];

servicio: Servicio = {
  _id: '',
  nombre: '',
  descripcion: '',
  precio: 0,
  disponible: true
};

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe(
      (data) => this.servicios = data,
      (error) => console.error('Error al cargar los servicios', error)
    );
  }

  guardarServicio(): void {
    if (!this.servicio.nombre || !this.servicio.descripcion || this.servicio.precio <= 0) {
      console.warn('Datos incompletos o inválidos');
      return;
    }

    this.servicioService.crearServicio(this.servicio).subscribe(
      (nuevoServicio) => {
        this.servicios.push(nuevoServicio);
        this.limpiarFormulario();
      },
      (error) => console.error('Error al guardar el servicio', error)
    );
  }

  editarServicio(servicio: Servicio): void {
    this.servicio = { ...servicio };
  }

  eliminarServicio(id: string): void {
    this.servicioService.eliminarServicio(id).subscribe(
      () => {
        this.servicios = this.servicios.filter(s => s._id !== id);
      },
      (error) => console.error('Error al eliminar el servicio', error)
    );
  }

  limpiarFormulario(): void {
    this.servicio = {
      nombre: '',
      descripcion: '',
      precio: 0,
      disponible: true
    };
  }
}
