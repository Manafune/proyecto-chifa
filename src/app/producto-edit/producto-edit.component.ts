import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../producto-add/producto.model';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: true
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      const productos = await this.productoService.obtenerProductos();
      const productoEncontrado = productos.find((p: Producto) => p.id === id);
      if (productoEncontrado) {
        this.producto = productoEncontrado;
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    }
  }

  async onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      await this.productoService.editar(id, this.producto);
      this.router.navigate(['/producto-add']);
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  }

  onRegresar() {
    this.router.navigate(['/producto-add']);
  }
}