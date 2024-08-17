import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaOrdenesComponent } from './lista-ordenes/lista-ordenes.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { NavComponent } from './nav/nav.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesComponent,
    ListaOrdenesComponent,
    ProductoAddComponent,
    NavComponent,
    ProductoCreateComponent,
    ProductoEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
