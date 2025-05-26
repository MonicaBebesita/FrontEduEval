import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ver-competencia-programa',
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row">
        <!-- Lado izquierdo: Detalles -->
        <div class="col-md-7">
          <h3 class="mb-4">Detalles de la Competencia</h3>
          <p><strong>ID:</strong> {{ competencia?.id }}</p>
          <p><strong>Nombre:</strong> {{ competencia?.nombre }}</p>
          <p><strong>Descripción:</strong> {{ competencia?.descripcion }}</p>
          <p><strong>Nivel:</strong> {{ competencia?.nivel }}</p>

          <div *ngIf="competencia?.ra?.length">
            <h5 class="mt-4">Resultados de Aprendizaje</h5>
            <ul class="list-group">
              <li *ngFor="let ra of competencia.ra" class="list-group-item">
                {{ ra.descripcion }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Lado derecho: Imagen -->
        <div class="col-md-5 text-center">
          <img
            src="https://via.placeholder.com/300x300?text=Imagen+Competencia"
            alt="Imagen de la competencia"
            class="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  `
})
export class VerCompetenciaProgramaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  competencia: any;

  // Simulación de datos compartidos
  competencias = [
    {
      id: 1,
      nombre: 'Resolver problemas',
      descripcion: 'Capacidad para analizar y resolver situaciones complejas.',
      nivel: 'Avanzado',
      ra: [
        { descripcion: 'Identificar variables clave.' },
        { descripcion: 'Plantear estrategias de solución.' }
      ]
    },
    {
      id: 2,
      nombre: 'Pensamiento crítico',
      descripcion: 'Evaluar información de forma objetiva.',
      nivel: 'Básico',
      ra: [
        { descripcion: 'Analizar argumentos.' },
        { descripcion: 'Distinguir hechos de opiniones.' }
      ]
    }
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.competencia = this.competencias.find((c) => c.id === id);
    });
  }
}
