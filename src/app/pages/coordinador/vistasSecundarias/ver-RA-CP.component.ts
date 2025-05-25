import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ra-programa',
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Resultados de Aprendizaje del Programa</h2>
        <button class="btn btn-primary" (click)="anadirRA()">Añadir RA</button>
      </div>

      <table class="table table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let ra of raList">
            <td>{{ ra.id }}</td>
            <td>{{ ra.descripcion }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-warning me-2" (click)="editarRA(ra.id)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="eliminarRA(ra.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  `
})
export class RaProgramaComponent {
  raList = [
    { id: 1, descripcion: 'Comprender principios básicos de programación.' },
    { id: 2, descripcion: 'Aplicar estructuras de control en programas.' },
    { id: 3, descripcion: 'Diseñar algoritmos eficientes.' },
  ];

  anadirRA() {
    console.log('Añadir RA');
    // Aquí puedes abrir un modal o redirigir a una página de creación
  }

  editarRA(id: number) {
    console.log('Editar RA con ID:', id);
    // Aquí puedes abrir un modal o redirigir a la página de edición
  }

  eliminarRA(id: number) {
    console.log('Eliminar RA con ID:', id);
    this.raList = this.raList.filter(ra => ra.id !== id);
  }
}
