// src/app/components/organisms/asignaturas-list/asignaturas-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturaCardComponent } from '../../atoms/asignatura-card/asignatura-card.component';
import { Asignatura } from '../../../modelos/asignatura';

@Component({
  selector: 'app-asignaturas-list',
  standalone: true,
  imports: [CommonModule, AsignaturaCardComponent],
  templateUrl:'./asignaturas-list.component.html' 
})
export class AsignaturasListComponent {
  @Input() asignaturas: Asignatura[] = [];
  @Input() rutaDestinoBase!: string; // Renombrado
}