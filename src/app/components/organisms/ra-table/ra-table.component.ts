// src/app/components/organisms/ra-table/ra-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  standalone: true,
  selector: 'app-ra-table',
  imports: [CommonModule],
  template: `
    <table class="table table-bordered table-striped align-middle">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Fecha de creación</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let ra of resultados">
          <td>{{ ra.id }}</td>
          <td>{{ ra.descripcion }}</td>
          <td>{{ ra.fecha | date:'shortDate' }}</td>
          <td class="text-center">
            <button class="btn btn-success btn-sm" (click)="anadirRa.emit(ra)">
              <i class="bi bi-plus-lg"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class RaTableComponent {
  @Input() resultados: { id: number; descripcion: string; fecha: Date }[] = [];
  @Output() anadirRa = new EventEmitter<any>();
}
