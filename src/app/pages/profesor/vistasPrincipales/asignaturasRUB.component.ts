import { Component } from '@angular/core';
import { AsignaturasTemplateComponent } from '../../../components/templates/asignaturas/asignatura-template.component';

@Component({
  standalone: true,
  selector: 'app-asignaturas-rub-page',
  imports: [AsignaturasTemplateComponent],
  template: `
    <app-asignaturas-template
      [titulo]="'Mis Asignaturas'"
      [rutaDestino]="'/profesor/RAasignatura'"
      [asignaturas]="asignaturas"
    />
  `,
})
export class AsignaturasRUBPage {
  asignaturas = [
    {
      id: 'matematicas',
      nombre: 'Matemáticas',
      descripcion: 'Álgebra, geometría y más.',
      color: '#28a745',
    },
    {
      id: 'ciencias',
      nombre: 'Ciencias',
      descripcion: 'Biología, física y química.',
      color: '#17a2b8',
    },
    {
      id: 'historia',
      nombre: 'Historia',
      descripcion: 'Desde la antigüedad hasta la actualidad.',
      color: '#ffc107',
    },
  ];
}
