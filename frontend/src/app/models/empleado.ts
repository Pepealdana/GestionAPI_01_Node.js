// src/app/models/empleado.ts

export interface Empleado {
  _id?: string; // 👈 importante: opcional
  nombre: string;
  cargo: string;
  oficina: string;
  salario: number;
}
