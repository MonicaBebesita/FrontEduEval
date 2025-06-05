// src/app/pages/coordinador/vistasSecundarias/crear-competencia-asignatura.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CrearCompetenciaTemplateComponent } from '../../../components/templates/crear-competencia-template/crear-competencia-template.component';
import { CompetenciaAsignaturaService } from '../../../services/asignatura.service';

@Component({
  standalone: true,
  selector: 'app-crear-competencia-asignatura',
  imports: [CommonModule, CrearCompetenciaTemplateComponent, RouterModule],
  template: `
    <app-crear-competencia-template
      [mostrarVinculacion]="true"
      [competenciasPrograma]="[
        { id: 1, descripcion: 'Resolver problemas', nivel: 'avanzado' },
        { id: 2, descripcion: 'Pensamiento crítico', nivel: 'básico' }
      ]"
      (crear)="guardarCompetencia($event)"
    />
  `,
})
export class CrearCompetenciaAsignaturaComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private competenciaAsignaturaService = inject(CompetenciaAsignaturaService);

  idAsignaturaSeleccionada: number | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idAsignaturaSeleccionada = +id;
        console.log('ID de Asignatura obtenido de la ruta para crear:', this.idAsignaturaSeleccionada);
      } else {
        console.error('No se encontró el ID de la asignatura en la ruta. No se podrá crear la competencia.');
        alert('Error: No se ha podido determinar la asignatura. Por favor, selecciona una asignatura.');
        this.router.navigate(['/programa/CAasignaturas']); // Redirigir a la lista de asignaturas
      }
    });
  }

  guardarCompetencia(competenciaData: any) {
    if (!this.idAsignaturaSeleccionada) {
      alert('Error: No se ha podido determinar la asignatura para crear la competencia.');
      return;
    }

    const dataToSend = {
      id_asignatura: this.idAsignaturaSeleccionada,
      descripcion: competenciaData.descripcion,
      nivel: competenciaData.nivel,
      resultados_aprendizaje: competenciaData.resultados_aprendizaje?.map((ra: any) => ({
        descripcion: ra.descripcion,
      })) || [],
    };

    this.competenciaAsignaturaService.crearCompetenciaAsignatura(dataToSend).subscribe({
      next: (response) => {
        console.log('Competencia de Asignatura creada exitosamente:', response);
        alert('Competencia de Asignatura creada exitosamente');
        // Redirigir de vuelta a la vista de gestión de competencias de la ASIGNATURA ESPECÍFICA
        this.router.navigate(['/programa/CA', this.idAsignaturaSeleccionada]);
      },
      error: (error) => {
        console.error('Error al crear Competencia de Asignatura:', error);
        let errorMessage = 'Ocurrió un error al crear la competencia de asignatura.';
        if (error.status === 400 && error.error) {
          try {
            const errorDetails = JSON.stringify(error.error, null, 2);
            errorMessage += `\nDetalles: ${errorDetails}`;
          } catch (e) {
            errorMessage += `\nDetalles: ${error.error}`;
          }
        }
        alert(errorMessage);
      },
    });
  }
}