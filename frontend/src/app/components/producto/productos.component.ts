import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    stock: 0
  };

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }

  guardarProducto(): void {
    this.productoService.crearProducto(this.producto).subscribe({
      next: () => {
        this.obtenerProductos();
        this.limpiarFormulario(); // opción más limpia
      },
      error: (err) => console.error('Error al guardar producto:', err)
    });
  }

  eliminarProducto(id: string): void {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => this.obtenerProductos(),
      error: (err) => console.error('Error al eliminar producto:', err)
    });
  }

  limpiarFormulario(): void {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      stock: 0
    };
  }
}
