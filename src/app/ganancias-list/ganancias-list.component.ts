import { Component } from '@angular/core';
import { CierreCajaResponse } from './cierre-caja.model';
import { CierreCajaService } from '../service/cierre-caja.service';

@Component({
  selector: 'app-ganancias-list',
  templateUrl: './ganancias-list.component.html',
  styleUrl: './ganancias-list.component.css'
})
export class GananciasListComponent {
  cierresCaja: CierreCajaResponse[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  constructor(private cierreCajaService: CierreCajaService) { }

  ngOnInit(): void {
    this.obtenerCierresDeCaja(this.currentPage);
  }

  async obtenerCierresDeCaja(page: number): Promise<void> {
    try {
      const response = await this.cierreCajaService.obtenerCierres(page);
      this.cierresCaja = response.content; // Asume que el backend devuelve un objeto con una propiedad 'content' para los elementos actuales.
      this.totalPages = response.totalPages; // Asume que el backend devuelve el total de páginas.
      this.currentPage = page;
    } catch (error) {
      console.error('Error al obtener los cierres de caja:', error);
    }
  }
  
  cambiarPagina(incremento: number): void {
    const nuevaPagina = this.currentPage + incremento;
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPages) {
      this.obtenerCierresDeCaja(nuevaPagina);
    }
  }
}
