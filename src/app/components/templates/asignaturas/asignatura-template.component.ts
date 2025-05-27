
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasListComponent } from '../../../components/organisms/asignaturas-list/asignaturas-list.component';

@Component({
  selector: 'app-asignaturas-template',
  standalone: true,
  imports: [CommonModule, AsignaturasListComponent],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">{{ titulo }}</h2>
      <app-asignaturas-list
        [asignaturas]="asignaturas"
        [rutaDestino]="rutaDestino"
      ></app-asignaturas-list>
    </div>
  `,
})
export class AsignaturasTemplateComponent {
  @Input() titulo = 'Asignaturas';
  @Input() rutaDestino = '/programa';
  @Input() asignaturas: { id: string; nombre: string; descripcion: string; color: string }[] = [];
}
