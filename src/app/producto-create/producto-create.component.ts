import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../producto-add/producto.model';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent {
  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: true
  };

  constructor(private productoService: ProductoService, private router: Router) { }

  async onSubmit() {
    if (this.producto.nombre && this.producto.descripcion && this.producto.precio > 0) {
      try {
        await this.productoService.registrar(this.producto);
        this.router.navigate(['/producto-add']);
      } catch (error) {
        console.error('Error al registrar el producto:', error);
      }
    } else {
      console.error('Formulario no válido');
    }
  }

}