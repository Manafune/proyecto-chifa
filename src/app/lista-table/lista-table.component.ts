import { Component, inject } from '@angular/core';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-lista-table',
  templateUrl: './lista-table.component.html',
  styleUrl: './lista-table.component.css'
})
export class ListaTableComponent {
  tableService=inject(TableService)
  async ngOnInit(): Promise<void> {
     await this.tableService.obtenerMesas()
    
  }
}
