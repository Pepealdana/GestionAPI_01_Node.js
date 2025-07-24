export interface Producto {
  _id?: string; // Opcional si aún no se ha guardado
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number; // Nueva propiedad agregada
}
