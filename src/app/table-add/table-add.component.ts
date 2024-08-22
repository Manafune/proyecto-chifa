import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableService } from '../service/table.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrl: './table-add.component.css',
  imports: [ReactiveFormsModule,RouterLink],
  standalone: true,
})
export class TableAddComponent {
  protected readonly tableService = inject(TableService)
  protected readonly router= inject(Router)
  protected tableAddForm = new FormGroup({
    numberTable: new FormControl('', [Validators.required, Validators.min(1)])
  });
  async handleSubmit() {
    const numberTable = parseFloat(this.tableAddForm.value.numberTable?.toString() ?? '');
    if (isNaN(numberTable)) return
    try {
      const result = await this.tableService.registrar({ numeroMesa: numberTable });
      this.tableAddForm.reset();
      this.router.navigate(["/lista-table"])
    } catch (error) {
      console.error('Error al registrar la mesa:', error);
    }

  }
}
