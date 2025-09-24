// src/app/models/empleado.ts

export interface Empleado {
  _id?: string;        // <-- lo agregamos (opcional)
  nombre: string;
  puesto: string;
  salario: number;
}
