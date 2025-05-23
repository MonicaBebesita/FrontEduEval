// src/app/organisms/asignaturas-list/asignaturas-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturaCardComponent } from '../../atoms/asignatura-card/asignatura-card.component';

@Component({
  selector: 'app-asignaturas-list',
  standalone: true,
  imports: [CommonModule, AsignaturaCardComponent],
  template: `
    <div class="row">
      <div class="col-md-4 mb-3" *ngFor="let asignatura of asignaturas">
        <app-asignatura-card
          [id]="asignatura.id"
          [nombre]="asignatura.nombre"
          [descripcion]="asignatura.descripcion"
          [color]="asignatura.color"
        ></app-asignatura-card>
      </div>
    </div>
  `,
})
export class AsignaturasListComponent {
  @Input() asignaturas: any[] = [];
}
