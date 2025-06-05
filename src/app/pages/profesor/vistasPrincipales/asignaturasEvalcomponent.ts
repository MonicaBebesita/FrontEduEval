import { Component } from '@angular/core';
import { AsignaturasTemplateComponent } from '../../../components/templates/asignaturas/asignatura-template.component';
import { Asignatura } from '../../../modelos/asignatura';

@Component({
  standalone: true,
  selector: 'app-asignaturas-eval-page',
  imports: [AsignaturasTemplateComponent],
  template: `
    <app-asignaturas-template

      [titulo]="'Asignaturas del Programa'"
      [rutaDestinoBase]="'/profesor/VerEvaluaciones'"
      [asignaturas]="asignaturas"
    />
  `,
})
export class AsignaturasEvalPage {
  // Simulamos las asignaturas con IDs numéricos
  asignaturas: Asignatura[] = [
    {
      id: 101, // ID numérico de la asignatura
      nombre: 'Matemáticas',
      descripcion: 'Álgebra, geometría y más.',
      color: '#28a745',
    },
    {
      id: 102, // ID numérico de la asignatura
      nombre: 'Ciencias',
      descripcion: 'Biología, física y química.',
      color: '#17a2b8',
    },
    {
      id: 103, // ID numérico de la asignatura
      nombre: 'Historia',
      descripcion: 'Desde la antigüedad hasta la actualidad.',
      color: '#ffc107',
    },
  ];
}
