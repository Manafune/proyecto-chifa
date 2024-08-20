import { Injectable, signal } from "@angular/core";
import { FacturaResponse } from "../factura-list/factura-list.model";

@Injectable({
    providedIn: 'root'
})
export class FacturaService {
    private url = 'http://localhost:8080/api/facturas';
  
    constructor() {}
  
    async obtenerFacturas(): Promise<FacturaResponse[]> {
      try {
        const response = await fetch(`${this.url}/todas`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
      }
    }
  
    async marcarComoPagada(id: number): Promise<void> {
      try {
        const response = await fetch(`${this.url}/pagar/${id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          const errorDetail = await response.text();
          throw new Error(`Error: ${response.status} - ${errorDetail}`);
        }
      } catch (error) {
        console.error('Error al marcar la factura como pagada:', error);
        throw error;
      }
    }
  }