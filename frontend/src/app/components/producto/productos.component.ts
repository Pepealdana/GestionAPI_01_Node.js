import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: ''
  };

  columnasTabla: string[] = ['nombre', 'descripcion', 'precio', 'stock', 'categoria', 'acciones'];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (data) => this.productos = data,
      (error) => console.error('Error al cargar los productos', error)
    );
  }

  guardarProducto(): void {
    if (!this.producto.nombre || this.producto.precio <= 0) {
      console.warn('Datos incompletos o inválidos');
      return;
    }

    const operacion = this.producto._id
      ? this.productoService.actualizarProducto(this.producto._id, this.producto)
      : this.productoService.crearProducto(this.producto);

    operacion.subscribe({
      next: () => {
        this.cargarProductos(); // Refresca la tabla automáticamente
        this.limpiarFormulario();
      },
      error: (error) => console.error('Error al guardar/actualizar el producto', error)
    });
  }

  editarProducto(producto: Producto): void {
    this.producto = { ...producto }; // Clonamos con su _id para que se pueda actualizar
  }

  eliminarProducto(id: string): void {
    this.productoService.eliminarProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter(p => p._id !== id);
      },
      (error) => console.error('Error al eliminar el producto', error)
    );
  }

  limpiarFormulario(): void {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      categoria: ''
    };
  }
}
