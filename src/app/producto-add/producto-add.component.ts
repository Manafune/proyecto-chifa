import { Component } from '@angular/core';
import { Producto } from './producto.model';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrl: './producto-add.component.css'
})
export class ProductoAddComponent {
  products: Producto[] = [];

  constructor(private productoSevice: ProductoService){}

  async ngOnInit(): Promise<void> {
    this.products = await this.productoSevice.obtenerProductos();
  }

}
