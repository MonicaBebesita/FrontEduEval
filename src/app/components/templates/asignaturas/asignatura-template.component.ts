// src/app/components/templates/asignaturas-template/asignaturas-template.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasListComponent } from '../../organisms/asignaturas-list/asignaturas-list.component';
import { Asignatura } from '../../../modelos/asignatura';

@Component({
  selector: 'app-asignaturas-template',
  standalone: true,
  imports: [CommonModule, AsignaturasListComponent],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">{{ titulo }}</h2>
      <app-asignaturas-list
        [asignaturas]="asignaturas"
        [rutaDestinoBase]="rutaDestinoBase"
      ></app-asignaturas-list>
    </div>
  `,
})
export class AsignaturasTemplateComponent {
  @Input() titulo = 'Asignaturas';
  @Input() rutaDestinoBase = '/'; 
  @Input() asignaturas: Asignatura[] = [];
}