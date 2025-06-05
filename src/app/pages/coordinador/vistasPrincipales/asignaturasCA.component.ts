// src/app/pages/coordinador/vistasPrincipales/asignaturasCA.component.ts
import { Component } from '@angular/core';
import { AsignaturasTemplateComponent } from '../../../components/templates/asignaturas/asignatura-template.component';
import { Asignatura } from '../../../modelos/asignatura';

@Component({
  standalone: true,
  selector: 'app-asignaturas-ca-page',
  imports: [AsignaturasTemplateComponent],
  template: `
    <app-asignaturas-template
      [titulo]="'Asignaturas del Programa'"
      [rutaDestinoBase]="'/programa/CA'"
      [asignaturas]="asignaturas"
    />
  `,
})
export class AsignaturasCAPage {
  asignaturas: Asignatura[] = [
    {
      id: 101,
      nombre: 'Matemáticas',
      descripcion: 'Álgebra, geometría y más.',
      color: '#28a745',
    },
    {
      id: 102,
      nombre: 'Ciencias',
      descripcion: 'Biología, física y química.',
      color: '#17a2b8',
    },
    {
      id: 103,
      nombre: 'Historia',
      descripcion: 'Desde la antigüedad hasta la actualidad.',
      color: '#ffc107',
    },
  ];
}
