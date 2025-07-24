import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ProductosComponent } from './components/producto/productos.component';


const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }, // Redirección inicial
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'productos', component: ProductosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
