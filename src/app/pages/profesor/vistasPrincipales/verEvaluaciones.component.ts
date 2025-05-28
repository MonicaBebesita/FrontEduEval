import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ver-evaluaciones',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <h2>Evaluaciones de la Asignatura: {{ asignaturaId }}</h2>

      <div *ngFor="let grupo of raAgrupados" class="mb-4">
        <div
          class="d-flex align-items-center mb-2"
          (click)="grupo.expandido = !grupo.expandido"
          style="cursor: pointer;"
        >
          <i
            class="bi me-2"
            [ngClass]="grupo.expandido ? 'bi-chevron-down' : 'bi-chevron-right'"
          ></i>
          <h4 class="mb-0">{{ grupo.competencia }}</h4>
        </div>

        <div class="ms-4" *ngIf="grupo.expandido">
          <ul class="list-group">
            <li *ngFor="let ra of grupo.ras" class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center" (click)="ra.expandido = !ra.expandido" style="cursor: pointer">
                  <i
                    class="bi me-2"
                    [ngClass]="ra.expandido ? 'bi-chevron-down' : 'bi-chevron-right'"
                  ></i>
                  <strong>{{ ra.descripcion }}</strong>
                </div>

                <a [routerLink]="['/profesor/crearEvaluacion', ra.id]" class="btn btn-outline-success btn-sm">
                  <i class="bi bi-plus-circle"></i> Añadir Evaluación
                </a>
              </div>

              <ul *ngIf="ra.expandido" class="list-group mt-2 ms-4">
                <li
                  *ngFor="let eval of ra.evaluaciones"
                  class="list-group-item d-flex justify-content-between align-items-center eval-item"
                  [routerLink]="['/evaluaciones', eval.id]"
                >
                  <div>
                    {{ eval.nombreEstudiante }} - <strong>{{ eval.calificacionTotal }}/5.0</strong>
                  </div>
                  <div>
                    <button class="btn btn-outline-primary btn-sm me-2" (click)="$event.stopPropagation()">
                      <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-outline-danger btn-sm" (click)="$event.stopPropagation(); eliminarEvaluacion(eval)">
                      <i class="bi bi-trash"></i> Eliminar
                    </button>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .eval-item {
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      }
      .eval-item:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #f8f9fa;
      }
    `,
  ],
})
export class VerEvaluacionesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  asignaturaId = '';

  raAgrupados: {
    competencia: string;
    expandido: boolean;
    ras: {
      id: number;
      descripcion: string;
      expandido?: boolean;
      evaluaciones: { id: number; nombreEstudiante: string; calificacionTotal: number }[];
    }[];
  }[] = [];

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('id') || '';

    // Datos simulados
    this.raAgrupados = [
      {
        competencia: 'Resolver ecuaciones',
        expandido: false,
        ras: [
          {
            id: 1,
            descripcion: 'RA 1.1 - Resolver ecuaciones lineales',
            evaluaciones: [
              { id: 101, nombreEstudiante: 'Juan Pérez', calificacionTotal: 4.2 },
              { id: 102, nombreEstudiante: 'Ana Gómez', calificacionTotal: 3.5 },
            ],
          },
        ],
      },
      {
        competencia: 'Analizar funciones',
        expandido: false,
        ras: [
          {
            id: 2,
            descripcion: 'RA 2.1 - Interpretar funciones polinómicas',
            evaluaciones: [
              { id: 201, nombreEstudiante: 'Carlos Díaz', calificacionTotal: 78 },
            ],
          },
        ],
      },
    ];
  }

  eliminarEvaluacion(evaluacion: any) {
    if (confirm(`¿Eliminar evaluación de ${evaluacion.nombreEstudiante}?`)) {
      this.raAgrupados.forEach((grupo) => {
        grupo.ras.forEach((ra) => {
          ra.evaluaciones = ra.evaluaciones.filter((e) => e.id !== evaluacion.id);
        });
      });
    }
  }
}
