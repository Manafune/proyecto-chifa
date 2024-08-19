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

  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      try {
        this.producto = await this.productoService.obtenerProductoPorId(id);
        this.loading = false;
      } catch (error) {
        this.error = 'Error al obtener el producto';
        this.loading = false;
      }
    } else {
      this.error = 'ID del producto no válido';
      this.loading = false;
    }
  }

  async onSubmit() {
    const id = this.producto.id;
    try {
      await this.productoService.editar(id, this.producto);
      this.router.navigate(['/producto-add']); // Redirige a la lista de productos o a otra página
    } catch (error) {
      this.error = 'Error al guardar los cambios';
    }
  }

  onRegresar() {
    this.router.navigate(['/producto-add']);
  }
}