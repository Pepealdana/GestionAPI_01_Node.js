// src/app/models/servicio.model.ts
export interface Servicio {
  _id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
}