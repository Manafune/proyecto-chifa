import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrl: './table-add.component.css',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class TableAddComponent {
  protected readonly tableService = inject(TableService)
  protected tableAddForm = new FormGroup({
    numberTable: new FormControl('', [Validators.required, Validators.min(1)])
  });
  async handleSubmit() {
    const numberTable = parseFloat(this.tableAddForm.value.numberTable?.toString() ?? '');
    if (isNaN(numberTable)) return
    try {
      const result = await this.tableService.registrar({ numeroMesa: numberTable });
      console.log('Mesa registrada con éxito:', result);
      this.tableAddForm.reset();
    } catch (error) {
      // Manejar errores en la llamada al servicio
      console.error('Error al registrar la mesa:', error);
    }

  }
}
