import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rubricas-por-ra',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="title-header">
        <h2>Rubricas</h2>
      </div>

      <button class="btn btn-primary mb-3" (click)="agregarRubrica()">
        Añadir Rúbrica
      </button>

      <div *ngFor="let rubrica of rubricas" class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" (click)="rubrica.expandido = !rubrica.expandido">
              <i class="bi" [ngClass]="rubrica.expandido ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <strong>{{ rubrica.nombre }}</strong>
          </div>
          <div>
            <button class="btn btn-outline-success btn-sm me-2" (click)="agregarCriterio(rubrica)">
              <i class="bi bi-plus-circle"></i> Añadir Criterio
            </button>
            <button class="btn btn-outline-primary btn-sm me-2" (click)="editarRubrica(rubrica)">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="btn btn-outline-danger btn-sm" (click)="eliminarRubrica(rubrica)">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>

        <div *ngIf="rubrica.expandido" class="card-body">
          <div *ngFor="let criterio of rubrica.criterios" class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <strong>{{ criterio.nombre }}</strong>
                <small class="text-muted"> (Ponderación: {{ criterio.ponderacion }}%)</small>
              </div>
              <div>
                <button class="btn btn-outline-primary btn-sm me-2" (click)="editarCriterio(criterio)">
                  <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-outline-danger btn-sm" (click)="eliminarCriterio(rubrica, criterio)">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-sm">
                <thead class="table-light">
                  <tr>
                    <th style="width: 15%;">Nivel</th>
                    <th style="width: 65%;">Descripción</th>
                    <th style="width: 20%;">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let nivel of criterio.niveles">
                    <td>{{ nivel.nivel }}</td>
                    <td>{{ nivel.descripcion }}</td>
                    <td>{{ nivel.nota }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RubricasPorRaComponent {
  rubricas = [
    {
      nombre: 'Comprensión de conceptos',
      expandido: false,
      criterios: [
        {
          nombre: 'Claridad conceptual',
          ponderacion: 30,
          niveles: [
            { nivel: 'Alto', descripcion: 'Demuestra comprensión profunda', nota: 5 },
            { nivel: 'Medio', descripcion: 'Comprende parcialmente', nota: 3 },
            { nivel: 'Bajo', descripcion: 'No demuestra comprensión', nota: 1 }
          ]
        }
      ]
    },
    {
      nombre: 'Resolución de problemas',
      expandido: false,
      criterios: []
    }
  ];

  agregarRubrica() {
    // Lógica de navegación o modal
    alert('Agregar nueva rúbrica');
  }

  editarRubrica(rubrica: any) {
    alert(`Editar rúbrica: ${rubrica.nombre}`);
  }

  eliminarRubrica(rubrica: any) {
    if (confirm(`¿Eliminar rúbrica "${rubrica.nombre}"?`)) {
      this.rubricas = this.rubricas.filter(r => r !== rubrica);
    }
  }

  agregarCriterio(rubrica: any) {
    alert(`Agregar criterio a: ${rubrica.nombre}`);
  }

  editarCriterio(criterio: any) {
    alert(`Editar criterio: ${criterio.nombre}`);
  }


  eliminarCriterio(rubrica: any, criterio: any) {
    if (confirm(`¿Eliminar criterio "${criterio.nombre}"?`)) {
      rubrica.criterios = rubrica.criterios.filter((c: any) => c !== criterio);
    }
  }
}
