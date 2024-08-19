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
  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  constructor(private ordenService: OrderService){}

  async ngOnInit(): Promise<void> {
    await this.loadOrders();
  }

  async loadOrders() {
    const result = await this.ordenService.listarOrden(this.page, this.size);
    this.orders = result.content;
    this.totalElements = result.totalElements;
    this.totalPages = Math.ceil(this.totalElements / this.size);
  }
  toggleDetails(orderId: number) {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = orderId;
    }
  }

  async servirOrden(id: number) {
    try {
      await this.ordenService.servirOrden(id);
      // Opcionalmente, vuelve a cargar la lista de órdenes para reflejar el cambio
      await this.loadOrders();
    } catch (error) {
      console.error('Error al servir la orden:', error);
    }
  }
  
  trackByOrderId(index: number, order: Orden): number {
    return order.id;
  }

  trackByDetailId(index: number, detail: DetalleOrden): number {
    return detail.productoId;
  }

  nextPage() {
    if ((this.page + 1) * this.totalPages) {
      this.page++;
      this.loadOrders();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadOrders();
    }
  }
}
