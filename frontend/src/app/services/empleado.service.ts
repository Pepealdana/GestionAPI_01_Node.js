import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // Agregar empleado
  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado, {
      headers: this.getHeaders()
    });
  }

  // Obtener empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // Eliminar empleado
  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // ✅ Actualizar empleado (debe estar dentro de la clase)
  actualizarEmpleado(id: string, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado, {
      headers: this.getHeaders()
    });
  }
}
