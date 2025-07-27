import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  // Crear nuevo empleado
  crearEmpleado(data: Empleado): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar un empleado por ID
  actualizarEmpleado(id: string, data: Empleado): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar empleado por ID
  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
