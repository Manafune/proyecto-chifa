import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../service/factura.service';
import { FacturaResponse} from './factura-list.model';
import { Page } from './page.model';
import { CierreCajaService } from '../service/cierre-caja.service';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {
  facturas: FacturaResponse[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10

  constructor(private facturaService: FacturaService, private cierreCajaService: CierreCajaService) {}

  ngOnInit(): void {
    this.obtenerFacturasPaginadas(this.currentPage);
  }

  obtenerFacturasPaginadas(page: number): void {
    this.facturaService.obtenerFacturasPaginadas(page - 1, this.pageSize).then((data: Page<FacturaResponse>) => {
      this.facturas = data.content;
      this.totalPages = data.totalPages > 0 ? data.totalPages : 1; 
      this.currentPage = data.number + 1; 
    }).catch(error => {
      console.error('Error al obtener las facturas paginadas:', error);
    });
  }

  cambiarPagina(incremento: number): void {
    const nuevaPagina = this.currentPage + incremento;
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPages) {
      this.obtenerFacturasPaginadas(nuevaPagina);
    }
  }

  async marcarComoPagada(id: number): Promise<void> {
    try {
      await this.facturaService.marcarComoPagada(id);
      // Vuelve a cargar la página actual para actualizar el estado de las facturas
      this.obtenerFacturasPaginadas(this.currentPage);
    } catch (error) {
      console.error('Error al marcar la factura como pagada:', error);
    }
  }

  async handleCierreDeCaja(): Promise<void> {
    try {
      const resultado = await this.cierreCajaService.calcularCierreDeCaja();
      if (resultado) {
        alert('Cierre de caja realizado con éxito.');
        // Opcional: Actualizar la lista de facturas o realizar otras acciones necesarias
      }
    } catch (error) {
      console.error('Error al realizar el cierre de caja:', error);
    }
  }
}