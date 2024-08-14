import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DetalleOrdenRequest, OrdenRequest } from './orden-request.model';
import { OrderService } from '../service/ordenes.service';
import { Producto } from '../producto-add/producto.model';
import { ProductoService } from '../service/producto.service';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})

export class OrdenesComponent{

  form: FormGroup;
  productos: Producto[] = [];

  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private orderService = inject(OrderService);
  
  constructor() {
    this.form = this.fb.group({
      numeroMesa: ['', [Validators.required]],
      productos: this.fb.array([
        this.createProducto() // Inicializa el primer producto
      ])
    });
  }

  async ngOnInit(): Promise<void> {
    this.productos = await this.productoService.obtenerProductos();
  }

  get productosArray() {
    return this.form.get('productos') as FormArray;
  }

  createProducto(): FormGroup {
    return this.fb.group({
      productoId: [0, Validators.required],
      cantidad: [0, Validators.required]
    });
  }
  
  addProducto() {
    this.productosArray.push(this.createProducto());
  }

  removeProducto(index: number) {
    this.productosArray.removeAt(index);
  }


  async create() {
    if (this.form.valid) {
      const orderData: OrdenRequest = {
        mesaId: this.form.value.numeroMesa,
        detallesOrden: this.productosArray.value,
        fechaHora: new Date().toISOString()
      };
      try {
        const result = await this.orderService.insertar(orderData);
        this.form.reset();
        this.productosArray.clear(); // Limpiar el array de productos
        this.addProducto(); // Añadir al menos un producto después de resetear
        console.log(result);
      } catch (error) {
        console.error('Error al enviar el pedido:', error);
      }
    } else {
      console.error('Formulario no válido');
    }
  }
}
