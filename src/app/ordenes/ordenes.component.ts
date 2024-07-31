import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DetalleOrdenRequest, OrdenRequest } from './orden-request.model';
import { OrderService } from '../service/ordenes.service';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})

export class OrdenesComponent{

  productos: DetalleOrdenRequest[] = [{ productoId: 0, cantidad: 0 }];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    console.log("Hola");
    
  }

  addProducto() {
    this.productos.push({ productoId: 0, cantidad: 0 });
  }

  removeProducto(index: number) {
    this.productos.splice(index, 1);
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const registro: OrdenRequest = {
        mesaId: form.value.numeroMesa,
        detallesOrden: this.productos,
        fechaHora: new Date().toISOString() // Ajusta la fecha según lo que necesites
      };
      try {
       const orderData=await this.orderService.insertar(registro)
        form.reset()
        this.productos = [{ productoId: 0, cantidad: 0 }];
        console.log(orderData)
      } catch (error) {
        console.error('Error al enviar el pedido:', error);
      }
  
    } else {
      console.error('Formulario no válido');
    }
  }
}
