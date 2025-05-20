import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenciaFormComponent } from '../../organisms/competencia-form/competencia-form.component';

@Component({
  standalone: true,
  selector: 'app-crear-competencia-template',
  imports: [CommonModule, CompetenciaFormComponent],
  template: `
    <div class="container mt-4">
      <h2 class="mb-3">Gestionar Competencias y Resultados de Aprendizaje</h2>
      <app-competencia-form
        (crear)="emitirCompetencia($event)"
      ></app-competencia-form>
    </div>
  `,
})
export class CrearCompetenciaTemplateComponent {
  @Output() crear = new EventEmitter<any>();

  emitirCompetencia(competencia: any) {
    this.crear.emit(competencia);
  }
}
