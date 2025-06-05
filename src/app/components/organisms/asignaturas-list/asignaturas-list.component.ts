// src/app/components/organisms/asignaturas-list/asignaturas-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturaCardComponent } from '../../atoms/asignatura-card/asignatura-card.component';
import { Asignatura } from '../../../modelos/asignatura';

@Component({
  selector: 'app-asignaturas-list',
  standalone: true,
  imports: [CommonModule, AsignaturaCardComponent],
  template: `
    <div class="row">
      <div class="col-md-4" *ngFor="let asignatura of asignaturas">
        <app-asignatura-card
          [id]="asignatura.id"
          [nombre]="asignatura.nombre"
          [descripcion]="asignatura.descripcion"
          [color]="asignatura.color"
          [rutaBase]="rutaDestinoBase" />
      </div>
    </div>
  `,
})
export class AsignaturasListComponent {
  @Input() asignaturas: Asignatura[] = [];
  @Input() rutaDestinoBase!: string; // Renombrado
}