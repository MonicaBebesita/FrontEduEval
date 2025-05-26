import { Component, Output, EventEmitter, Input } from '@angular/core';
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
        [mostrarVinculacion]="mostrarVinculacion"
        [competenciasPrograma]="competenciasPrograma"
        (crear)="emitirCompetencia($event)"
      ></app-competencia-form>
    </div>
  `,
})
export class CrearCompetenciaTemplateComponent {
  @Output() crear = new EventEmitter<any>();
  @Input() mostrarVinculacion: boolean = true;
  @Input() competenciasPrograma: { id: number; descripcion: string, nivel:string }[] = [];
  emitirCompetencia(competencia: any) {
    this.crear.emit(competencia);
  }
}
