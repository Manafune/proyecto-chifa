import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../service/factura.service';
import { FacturaResponse} from './factura-list.model';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {
  facturas: FacturaResponse[] = [];

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas(): void {
    this.facturaService.obtenerFacturas().then((data: FacturaResponse[]) => {
      this.facturas = data;
    });
  }

  async marcarComoPagada(id: number): Promise<void> {
    try {
      await this.facturaService.marcarComoPagada(id);
      // Actualizar el estado de la factura localmente
      this.facturas = this.facturas.map(factura => 
        factura.id === id ? { ...factura, pagada: true } : factura
      );
    } catch (error) {
      console.error('Error al marcar la factura como pagada:', error);
    }
  }
}