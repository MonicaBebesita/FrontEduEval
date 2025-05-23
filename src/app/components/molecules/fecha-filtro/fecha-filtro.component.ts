// src/app/components/molecules/fecha-filtro/fecha-filtro.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-fecha-filtro',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3 d-flex align-items-end gap-2">
      <label class="form-label mb-0">Filtrar por fecha:</label>
      <input type="date" class="form-control" [(ngModel)]="fecha" (change)="emitirCambio()" />
    </div>
  `
})
export class FechaFiltroComponent {
  @Input() fecha: string = '';
  @Output() fechaChange = new EventEmitter<string>();

  emitirCambio() {
    this.fechaChange.emit(this.fecha);
  }
}