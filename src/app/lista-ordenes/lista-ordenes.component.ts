import { Component } from '@angular/core';
import { DetalleOrden, Orden } from './orden.model';
import { OrderService } from '../service/ordenes.service';
@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrl: './lista-ordenes.component.css'
})
export class ListaOrdenesComponent {
  orders: Orden[] = [];
  expandedOrderId: number | null = null;

  constructor(private ordenService: OrderService){}

  async ngOnInit(): Promise<void> {
    this.orders = await this.ordenService.listarOrden();
  }

  toggleDetails(orderId: number) {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = orderId;
    }
  }
  trackByOrderId(index: number, order: Orden): number {
    return order.id;
  }

  trackByDetailId(index: number, detail: DetalleOrden): number {
    return detail.productoId;
  }
}
