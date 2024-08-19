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
  paginaActual: number = 0;
  totalPaginas: number = 0;
  tamañoPagina: number = 10;
  constructor(private productoService: ProductoService){}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }
  async loadProducts(pagina: number = 0): Promise<void> {
    const result = await this.productoService.obtenerProductos(pagina, this.tamañoPagina);
    this.products = result.products;
    this.totalPaginas = result.totalPages;
    this.paginaActual = pagina;
  }

  siguientePagina(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.loadProducts(this.paginaActual + 1);
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.loadProducts(this.paginaActual - 1);
    }
  }
}
