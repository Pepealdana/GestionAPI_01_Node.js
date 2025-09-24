import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../app/models/empleado.model.ts';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  agregarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  actualizarEmpleado(id: string, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
