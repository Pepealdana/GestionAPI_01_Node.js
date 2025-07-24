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

  servicio: Servicio = {
    nombre: '',
    descripcion: '',
    estado: 'activo'
  };

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.servicioService.obtenerServicios().subscribe(
      (data) => this.servicios = data,
      (error) => console.error('Error al cargar los servicios', error)
    );
  }

  // ✅ ESTA FUNCIÓN DEBE ESTAR AQUÍ, DENTRO DE LA CLASE
  guardarServicio(): void {
    console.log('Servicio guardado:', this.servicio);

    this.servicioService.crearServicio(this.servicio).subscribe(
      (nuevoServicio) => {
        this.servicios.push(nuevoServicio);
        this.limpiarFormulario();
      },
      (error) => console.error('Error al guardar el servicio', error)
    );
  }

  limpiarFormulario(): void {
    this.servicio = {
      nombre: '',
      descripcion: '',
      estado: 'activo'
    };
  }
}
