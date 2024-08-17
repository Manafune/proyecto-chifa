import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ListaOrdenesComponent } from './lista-ordenes/lista-ordenes.component';

const routes: Routes = [
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'producto-add', component: ProductoAddComponent },
  { path: 'lista-ordenes', component: ListaOrdenesComponent },
  { path: 'producto-create', component: ProductoCreateComponent},
  { path: 'producto-edit/:id', component: ProductoEditComponent},
  { path: '', redirectTo: '/lista-ordenes', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }