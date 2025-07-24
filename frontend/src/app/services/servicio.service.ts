import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Servicio } from '../models/servicio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = 'http://localhost:3000/api/servicios';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // Obtener todos los servicios
  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // Crear nuevo servicio
  crearServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio, {
      headers: this.getHeaders()
    });
  }

  // Eliminar un servicio
  eliminarServicio(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // (Opcional) Actualizar un servicio
  actualizarServicio(id: string, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio, {
      headers: this.getHeaders()
    });
  }
}
