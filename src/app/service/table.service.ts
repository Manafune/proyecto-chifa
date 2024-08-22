import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Table } from '../table-add/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url = `${environment.API_URL}/api/mesas`;
  private totalTables = signal< Table[]>([]);

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
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }
      const result: Table = await response.json();
      return result;
    } catch (error) {
      console.error('Error al registrar la mesa:', error);
      throw new Error('Ocurrió un error al registrar la mesa. Por favor, revisa los datos y vuelve a intentar.');
    }
  }
   async obtenerMesas() {
    try {
      const response = await fetch(this.url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }
      const result: {content:Table[]}= await response.json();
      console.log(result)
      this.totalTables.set(result.content)
      return result;
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
      throw new Error('Ocurrió un error al obtener las mesas. Por favor, inténtalo de nuevo más tarde.');
     }
  }
   getTables(){
       return this.totalTables()
   }
}