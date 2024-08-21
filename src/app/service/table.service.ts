import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Table } from '../table-add/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url = `${environment.API_URL}/api/mesas`;

  constructor() { }
  async registrar(registro: Pick<Table,"numeroMesa">) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro),
      });

      if (!response.ok) {
        const errorDetail = await response.text()
        // extender de la clase error para añadir errores personalizados
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }
      const result: Table = await response.json();
      return result;
    } catch (error) {
      console.error('Error al registrar la mesa:', error);
      throw new Error('Ocurrió un error al registrar la mesa. Por favor, revisa los datos y vuelve a intentar.');
    }
  }
}