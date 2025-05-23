import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-gestionar-rubricas',
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Rúbricas de la asignatura: {{ asignaturaId }}</h2>

      <div *ngFor="let grupo of raAgrupados" class="mb-4">
        <h4>{{ grupo.competencia }}</h4>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center"
              *ngFor="let ra of grupo.ras">
            <div>
              <strong>{{ ra.descripcion }}</strong><br />
              <small>Creado: {{ ra.fecha }}</small>
            </div>
            <div>
              <button class="btn btn-outline-success btn-sm me-2" (click)="anadirCriterio(ra)">
                <i class="bi bi-plus-circle"></i> Añadir Criterio
              </button>
              <button class="btn btn-outline-danger btn-sm" (click)="eliminarRA(ra)">
                <i class="bi bi-trash"></i> Eliminar RA
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class GestionarRubricasComponent implements OnInit {
  private route = inject(ActivatedRoute);

  asignaturaId = '';
  raAgrupados: {
    competencia: string;
    ras: { descripcion: string; fecha: string; id: number }[];
  }[] = [];

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('id') || '';

    // Simulamos datos agrupados por competencia
    this.raAgrupados = [
      {
        competencia: 'Resolver ecuaciones',
        ras: [
          { id: 1, descripcion: 'RA 1.1', fecha: '2024-01-12' },
          { id: 2, descripcion: 'RA 1.2', fecha: '2024-02-03' },
        ],
      },
      {
        competencia: 'Analizar funciones',
        ras: [
          { id: 3, descripcion: 'RA 2.1', fecha: '2024-04-18' },
        ],
      },
    ];
  }

  anadirCriterio(ra: any) {
    alert(`Añadir criterio al RA: ${ra.descripcion}`);
  }

  eliminarRA(ra: any) {
    if (confirm(`¿Eliminar el RA "${ra.descripcion}"?`)) {
      this.raAgrupados = this.raAgrupados.map((grupo) => ({
        ...grupo,
        ras: grupo.ras.filter((r) => r.id !== ra.id),
      }));
    }
  }
}
