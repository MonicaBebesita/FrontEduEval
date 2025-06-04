import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CrearCompetenciaTemplateComponent } from '../../../components/templates/crear-competencia-template/crear-competencia-template.component';
import { CompetenciaPrograma } from '../../../modelos/competencia-programa';
import { ProgramaService } from '../../../services/programa.service';

@Component({
  standalone: true,
  selector: 'app-crear-competencia-programa',
  imports: [CommonModule, CrearCompetenciaTemplateComponent, RouterModule],
  template: `
    <app-crear-competencia-template
      [mostrarVinculacion]="false"
      [competenciasPrograma]="[]"
      (crear)="guardarCompetencia($event)"
    />
  `,
})
export class CrearCompetenciaProgramaComponent {
  private router = inject(Router);
  private competenciaProgramaService = inject(ProgramaService);

  guardarCompetencia(competencia: any) {
    console.log('Datos de competencia recibidos desde el template:', competencia);

    // Mapear los datos del formulario a la estructura esperada por tu backend
    // 'id_programa', 'descripcion', 'nivel', 'resultados_aprendizaje'
    const competenciaParaGuardar: CompetenciaPrograma = {
      id_programa: competencia.id_programa,
      descripcion: competencia.descripcion,
      nivel: competencia.nivel,
      resultados_aprendizaje: competencia.resultados_aprendizaje,

    };

    this.competenciaProgramaService.crearCompetenciaPrograma(competenciaParaGuardar).subscribe({
      next: (response) => {
        console.log('Competencia creada exitosamente:', response);
        alert('Competencia creada exitosamente');
        this.router.navigate(['/asignatura']); // Redirigir después del éxito
      },
      error: (error) => {
        console.error('Error al crear la competencia:', error);
        let errorMessage = 'Ocurrió un error al crear la competencia.';
        if (error.status === 400 && error.error) {
          // Intentar parsear errores de Django REST Framework
          try {
            const errorDetails = JSON.stringify(error.error, null, 2);
            errorMessage += `\nDetalles: ${errorDetails}`;
          } catch (e) {
            errorMessage += `\nDetalles: ${error.error}`;
          }
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