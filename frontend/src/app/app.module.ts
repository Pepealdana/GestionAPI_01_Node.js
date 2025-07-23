import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // 👈 Importación correcta

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './components/empleados/empleados.component'; // 👈 Tu componente

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // 👈 Necesario para [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
