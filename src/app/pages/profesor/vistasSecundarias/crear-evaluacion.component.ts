import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Nivel {
  descripcion: string;
  nota: number;
}

interface Criterio {
  id: number;
  nombre: string;
  ponderacion: number; // porcentaje (0 a 5)
  niveles: {
    alto: Nivel;
    medio: Nivel;
    bajo: Nivel;
  };
  seleccionadoNivel?: 'alto' | 'medio' | 'bajo'; // nivel seleccionado
}

@Component({
  standalone: true,
  selector: 'app-anadir-evaluacion',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h3>Añadir Evaluación - RA {{ raId }}</h3>
      <form (ngSubmit)="guardarEvaluacion()">
        <div class="mb-3">
          <label for="nombreEstudiante" class="form-label">Nombre del Estudiante</label>
          <input
            id="nombreEstudiante"
            type="text"
            class="form-control"
            [(ngModel)]="nombreEstudiante"
            name="nombreEstudiante"
            required
          />
        </div>

        <div *ngFor="let criterio of criterios" class="mb-4 border p-3 rounded">
          <h5>{{ criterio.nombre }} (Ponderación: {{ criterio.ponderacion }}%)</h5>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nivel</th>
                <th>Descripción</th>
                <th>Nota</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let nivelKey of nivelKeys">
                <td>{{ nivelKey | titlecase }}</td>
                <td>{{ criterio.niveles[nivelKey].descripcion }}</td>
                <td>{{ criterio.niveles[nivelKey].nota }}</td>
                <td class="text-center">
                  <input
                    type="radio"
                    [name]="'criterio' + criterio.id"
                    [value]="nivelKey"
                    [(ngModel)]="criterio.seleccionadoNivel"
                    required
                    (change)="calcularNotas()"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="criterio.seleccionadoNivel" class="alert alert-info mt-2">
            Puntaje parcial para este criterio:
            <strong>{{ calcularPuntajeParcial(criterio) | number:'1.2-2' }}</strong>
          </div>
        </div>

        <div class="mb-3">
          <h4>Total de la evaluación: {{ puntajeTotal | number:'1.2-2' }}/5.0</h4>
        </div>

        <div class="mb-3">
          <label for="comentarios" class="form-label">Comentarios</label>
          <textarea
            id="comentarios"
            class="form-control"
            rows="3"
            [(ngModel)]="comentarios"
            name="comentarios"
            placeholder="Comentarios adicionales..."
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="!formValido()">Guardar Evaluación</button>
        <a class="btn btn-secondary ms-2" [routerLink]="['/evaluaciones', raId]">Cancelar</a>
      </form>
    </div>
  `,
})
export class AnadirEvaluacionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  raId = '';
  nombreEstudiante = '';
  comentarios = '';
  nivelKeys: ('alto' | 'medio' | 'bajo')[] = ['alto', 'medio', 'bajo'];


  criterios: Criterio[] = [];

  puntajeTotal = 0;

  ngOnInit() {
    this.raId = this.route.snapshot.paramMap.get('raId') || '';

    // Simulamos la carga de criterios para ese RA.
    // En la práctica deberías obtenerlo de un servicio/backend.
    this.criterios = [
      {
        id: 1,
        nombre: 'Criterio 1',
        ponderacion: 40,
        niveles: {
          alto: { descripcion: 'Descripción nivel alto', nota: 5 },
          medio: { descripcion: 'Descripción nivel medio', nota: 3 },
          bajo: { descripcion: 'Descripción nivel bajo', nota: 1 },
        },
      },
      {
        id: 2,
        nombre: 'Criterio 2',
        ponderacion: 60,
        niveles: {
          alto: { descripcion: 'Descripción nivel alto', nota: 5 },
          medio: { descripcion: 'Descripción nivel medio', nota: 3 },
          bajo: { descripcion: 'Descripción nivel bajo', nota: 1 },
        },
      },
    ];

    this.calcularNotas();
  }

  calcularPuntajeParcial(criterio: Criterio): number {
    if (!criterio.seleccionadoNivel) return 0;
    const notaNivel = criterio.niveles[criterio.seleccionadoNivel].nota;
    return (notaNivel * criterio.ponderacion) / 100;
  }

  calcularNotas() {
    this.puntajeTotal = this.criterios.reduce((acc, c) => acc + this.calcularPuntajeParcial(c), 0);
  }

  formValido(): boolean {
    return (
      this.nombreEstudiante.trim().length > 0 &&
      this.criterios.every((c) => c.seleccionadoNivel !== undefined)
    );
  }

  guardarEvaluacion() {
    if (!this.formValido()) return;

    // Aquí enviarías los datos al backend
    const evaluacion = {
      raId: this.raId,
      nombreEstudiante: this.nombreEstudiante,
      criterios: this.criterios.map((c) => ({
        criterioId: c.id,
        nivel: c.seleccionadoNivel,
        nota: this.calcularPuntajeParcial(c),
      })),
      puntajeTotal: this.puntajeTotal,
      comentarios: this.comentarios,
    };

    console.log('Guardando evaluación:', evaluacion);

    alert(`Evaluación guardada con nota total: ${this.puntajeTotal.toFixed(2)}`);

    this.router.navigate(['/evaluaciones', this.raId]);
  }
}
