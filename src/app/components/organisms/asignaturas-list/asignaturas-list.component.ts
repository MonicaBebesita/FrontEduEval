import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturaCardComponent } from '../../atoms/asignatura-card/asignatura-card.component';

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
          [ruta]="rutaDestino"
        />
      </div>
    </div>
  `,
})
export class AsignaturasListComponent {
  @Input() asignaturas: any[] = [];
  @Input() rutaDestino!: string 
}
