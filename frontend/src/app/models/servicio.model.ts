// src/app/models/servicio.model.ts
export interface Servicio {
  nombre: string;
  descripcion: string;
  estado?: string; // <-- opcional si lo usas después
}
