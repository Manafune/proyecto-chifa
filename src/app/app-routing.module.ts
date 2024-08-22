import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ListaOrdenesComponent } from './lista-ordenes/lista-ordenes.component';
import { FacturaListComponent } from './factura-list/factura-list.component';
import { TableAddComponent } from './table-add/table-add.component';
import { ListaTableComponent } from './lista-table/lista-table.component';
import { GananciasListComponent } from './ganancias-list/ganancias-list.component';

const routes: Routes = [
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'producto-add', component: ProductoAddComponent },
  { path: 'lista-ordenes', component: ListaOrdenesComponent },
  { path: 'producto-create', component: ProductoCreateComponent},
  { path: 'producto-edit/:id', component: ProductoEditComponent},
  { path: 'factura-list', component: FacturaListComponent },
  { path: "table-add", component: TableAddComponent },
  { path: "lista-table", component: ListaTableComponent},
  { path: 'factura-list', component: FacturaListComponent},
  { path: 'ganancias-list', component: GananciasListComponent},
  { path: '', redirectTo: '/lista-ordenes', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }