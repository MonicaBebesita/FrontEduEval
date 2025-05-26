import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CrearCompetenciaTemplateComponent } from '../../../components/templates/crear-competencia-template/crear-competencia-template.component';

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
  guardarCompetencia(competencia: any) {
    console.log('Competencia creada:', competencia);
    console.log('Competencia creada:', competencia);

    // Simulación: Guardar la competencia (puede ser un servicio en el futuro)
    // TODO: Reemplaza esta parte con una llamada real a tu backend o servicio
    const guardadoExitoso = true;

    if (guardadoExitoso) {
      // Mostrar mensaje de éxito
      alert('Competencia creada exitosamente');

      //  Redirigir a /asignatura
      this.router.navigate(['/asignatura']);
    } else {
      //  Mostrar error si algo falla
      alert('Ocurrió un error al crear la competencia');
    }
  }
}
