import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-lista-ra',
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Lista de Resultados de Aprendizaje</h2>
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Fecha de Modificación</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let ra of raList">
            <td>{{ ra.id }}</td>
            <td>{{ ra.descripcion }}</td>
            <td>{{ ra.fecha | date : 'dd/MM/yyyy' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class ListaRaPageComponent {
  raList = [
    {
      id: 1,
      descripcion: 'Comprender principios básicos de programación.',
      fecha: new Date('2024-01-10'),
    },
    {
      id: 2,
      descripcion: 'Aplicar estructuras de control en programas.',
      fecha: new Date('2024-02-20'),
    },
    {
      id: 3,
      descripcion: 'Diseñar algoritmos eficientes.',
      fecha: new Date('2024-03-15'),
    },
  ];
}
