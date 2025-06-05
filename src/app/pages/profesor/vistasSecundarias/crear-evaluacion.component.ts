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
  templateUrl: './crear-evaluacion.component.html'
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
