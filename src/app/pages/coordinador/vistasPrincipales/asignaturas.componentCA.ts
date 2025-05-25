// src/app/templates/asignaturas.template.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasListComponent } from '../../../components/organisms/asignaturas-list/asignaturas-list.component';

@Component({
  selector: 'app-asignaturas-templateCA',
  standalone: true,
  imports: [CommonModule, AsignaturasListComponent],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Competencias de la Asignatura</h2>
      <app-asignaturas-list
        [asignaturas]="asignaturas"
        rutaDestino="/programa/CA"
      ></app-asignaturas-list>
    </div>
  `,
})
export class AsignaturasComponentCAdePrograma {
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
