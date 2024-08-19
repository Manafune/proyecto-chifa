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
    this.productos = await this.productoService.obtenerProductosDisponibles();  // Asegúrate de que los productos tienen datos correctos
    if (this.productos.length > 0) {
      this.productosArray.controls.forEach((_, index) => {
        this.onProductoChange(index);
      });
    }
  }

  onProductoChange(index: number) {
    const productoControl = this.productosArray.at(index);
    console.log('Lista de productos:', this.productos);
    // Escuchar cambios en el select de productoId
    productoControl.get('productoId')?.valueChanges.subscribe((productoId: any) => {
      const id = Number(productoId); // Asegúrate de que el ID sea del tipo correcto
      console.log('Producto ID desde el formulario:', id);
    
      const selectedProducto = this.productos.find(p => p.id === id);
      console.log('Producto seleccionado:', selectedProducto);
    
      if (selectedProducto) {
        const precio = selectedProducto.precio;
        productoControl.patchValue({ precio: precio, subtotal: 0 }, { emitEvent: false });
        this.updateSubtotal(index);
      } else {
        console.error('Producto no encontrado con ID:', id);
        productoControl.patchValue({ precio: 0, subtotal: 0 }, { emitEvent: false });
      }
    });
  
    productoControl.get('cantidad')?.valueChanges.subscribe(() => {
      this.updateSubtotal(index);
    });
  }
  
  updateSubtotal(index: number) {
    const productoControl = this.productosArray.at(index);
    const cantidad = productoControl.get('cantidad')?.value || 0;
    const precio = productoControl.get('precio')?.value || 0;
    const subtotal = cantidad * precio;
    productoControl.patchValue({ subtotal: subtotal }, { emitEvent: false });
  }

  get productosArray() {
    return this.form.get('productos') as FormArray;
  }

  createProducto(): FormGroup {
    return this.fb.group({
      productoId: [0, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [{ value: 0, disabled: true }], 
      subtotal: [{ value: 0, disabled: true }]
    });
  }
  
  addProducto() {
    this.productosArray.push(this.createProducto());
    const newIndex = this.productosArray.length - 1;
    this.onProductoChange(newIndex);
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
