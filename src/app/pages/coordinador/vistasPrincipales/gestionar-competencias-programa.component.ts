// src/app/pages/gestionar-competencias-programa/gestionar-competencias-programa.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarCompetenciasTemplateComponent } from '../../../components/templates/gestionar-competencias-template/gestionar-competencias-template.component';
import { CompetenciaPrograma } from '../../../modelos/competencia-programa';
import { ProgramaService } from '../../../services/programa.service';

@Component({
  standalone: true,
  selector: 'app-gestionar-competencias-programa',
  imports: [CommonModule, GestionarCompetenciasTemplateComponent],
  template: `
    <app-gestionar-competencias-template
      [titulo]="'Competencias del Programa'"
      [competencias]="competencias"
      [routerLink]="['/programa/crearCP']"
      rutaRA="/programa/RAprograma"
      rutaEditar="/programa/editarCP"
      rutaVer="/programa/verCP"
      (eliminarCompetencia)="eliminarCompetencia($event)"
    >
    </app-gestionar-competencias-template>
  `,
})
export class GestionarCompetenciasProgramaComponent implements OnInit {
  private programaService = inject(ProgramaService);

  competencias: CompetenciaPrograma[] = [];

  ngOnInit(): void {
    this.cargarCompetencias();
  }

  cargarCompetencias(): void {
    this.programaService.listarCompetenciasPrograma().subscribe({
      next: (data) => {
        console.log('Competencias cargadas exitosamente:', data);
        this.competencias = data;
      },
      error: (error) => {
        console.error('Error al cargar las competencias:', error);
        alert('Ocurrió un error al cargar las competencias. Por favor, intenta de nuevo más tarde.');
      },
    });
  }

  eliminarCompetencia(id: number) {
    console.log('Intentando eliminar competencia con ID:', id);

    // Opcional: Confirmación con el usuario antes de eliminar
    if (confirm(`¿Estás seguro de que quieres eliminar la competencia con ID ${id}?`)) {
      this.programaService.eliminarCompetenciaPrograma(id).subscribe({
        next: () => {
          console.log(`Competencia con ID ${id} eliminada exitosamente del backend.`);
          alert('Competencia eliminada exitosamente.');
          this.cargarCompetencias(); // Recarga la lista para reflejar el cambio
        },
        error: (error) => {
          console.error(`Error al eliminar competencia con ID ${id}:`, error);
          let errorMessage = `Ocurrió un error al eliminar la competencia con ID ${id}.`;
          if (error.status === 404) {
            errorMessage = 'La competencia no fue encontrada en el servidor.';
          } else if (error.status === 401) {
            errorMessage = 'No autorizado. Por favor, inicia sesión de nuevo.';
          } else if (error.message) {
            errorMessage += `\n${error.message}`;
          }
          alert(errorMessage);
        },
      });
    }
  }
}