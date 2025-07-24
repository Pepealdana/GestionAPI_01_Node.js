import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados'; // URL del backend

  constructor(private http: HttpClient) {}

  private obtenerHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.obtenerHeaders() });
  }

  crearEmpleado(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.obtenerHeaders() });
  }

  actualizarEmpleado(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.obtenerHeaders() });
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.obtenerHeaders() });
  }
}
