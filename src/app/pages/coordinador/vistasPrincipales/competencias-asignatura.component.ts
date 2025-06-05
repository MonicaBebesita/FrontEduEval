// src/app/pages/coordinador/vistasPrincipales/competencias-asignatura.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router para la navegación
import { GestionarCompetenciasTemplateComponent } from '../../../components/templates/gestionar-competencias-template/gestionar-competencias-template.component';
import { CompetenciaAsignatura } from '../../../modelos/competencia-asignatura'; // Importa el modelo
import { CompetenciaAsignaturaService } from '../../../services/asignatura.service';

@Component({
  standalone: true,
  selector: 'competencias-asignatura',
  imports: [CommonModule, GestionarCompetenciasTemplateComponent],
  template: `
    <app-gestionar-competencias-template
      [titulo]="'Competencias de la Asignatura: ' + (asignaturaIdSimulado ? asignaturaIdSimulado.toString() : 'Cargando...')"
      [rutaRA]="'/programa/RAasignatura'"
      rutaEditar="/programa/editarCA"
      rutaVer="/programa/verCA"
      [routerLinkCrear]="['/programa/crearCA/', asignaturaIdSimulado]" [competencias]="competencias"
      (eliminarCompetencia)="eliminarCompetencia($event)"
    >
    </app-gestionar-competencias-template>
  `,
})
export class CompetenciasAsignaturaComponentdePrograma implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Inyecta el Router
  private competenciaAsignaturaService = inject(CompetenciaAsignaturaService); // Inyecta el servicio

  asignaturaIdSimulado: number | null = null;
  competencias: {
    id: number;
    descripcion: string;
    nivel: string; // Nivel como string para la visualización (básico, intermedio, avanzado)
    id_asignatura: number; // El ID de la asignatura real de la BD
  }[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.asignaturaIdSimulado = +idParam; // Convertir a número
        this.cargarCompetencias();
      } else {
        console.error('No se encontró el ID de la asignatura en la ruta.');
        this.router.navigate(['/programa/CAasignaturas']); // Redirigir si no hay ID
      }
    });
  }

  cargarCompetencias() {
    if (this.asignaturaIdSimulado === null) {
      return;
    }

    this.competenciaAsignaturaService.listarCompetenciasAsignatura().subscribe({
      next: (data: CompetenciaAsignatura[]) => {
        // Filtrar las competencias que pertenecen a la asignatura actual
        // Necesitas un mapeo de nivel de número a string para el display si tu template lo espera así.
        this.competencias = data
          .filter((c) => c.id_asignatura === this.asignaturaIdSimulado)
          .map((c) => ({
            id: c.id!, // Asegúrate de que el ID exista si lo filtras
            descripcion: c.descripcion,
            nivel: this.mapNivelToString(c.nivel), // Mapea el nivel numérico a string
            id_asignatura: c.id_asignatura, // Mantén el ID de la asignatura
          }));
        console.log(`Competencias cargadas para Asignatura ${this.asignaturaIdSimulado}:`, this.competencias);
        if (this.competencias.length === 0) {
            console.warn('No hay competencias para esta asignatura.');
        }
      },
      error: (error) => {
        console.error('Error al cargar las competencias de asignatura:', error);
        alert('Error al cargar las competencias de asignatura. Detalles en consola.');
      },
    });
  }

  eliminarCompetencia(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta competencia?')) {
      this.competenciaAsignaturaService.eliminarCompetenciaAsignatura(id).subscribe({
        next: () => {
          console.log('Competencia eliminada exitosamente:', id);
          alert('Competencia eliminada exitosamente.');
          this.cargarCompetencias(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar competencia:', error);
          let errorMessage = 'Ocurrió un error al eliminar la competencia.';
          if (error.status === 404) {
              errorMessage += ' (Competencia no encontrada)';
          } else if (error.error && error.error.detail) {
              errorMessage += `\nDetalles: ${error.error.detail}`;
          }
          alert(errorMessage);
        },
      });
    }
  }

  private mapNivelToString(nivel: 1 | 2 | 3): string {
    switch (nivel) {
      case 1:
        return 'Básico';
      case 2:
        return 'Medio';
      case 3:
        return 'Avanzado';
      default:
        return 'Desconocido';
    }
  }
}