import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenciaFormComponent } from '../../organisms/competencia-form/competencia-form.component';

@Component({
  standalone: true,
  selector: 'app-crear-competencia-template',
  imports: [CommonModule, CompetenciaFormComponent],
  templateUrl:'./crear-competencia-template.component.html'
})
export class CrearCompetenciaTemplateComponent {
  @Output() crear = new EventEmitter<any>();
  @Input() mostrarVinculacion: boolean = true;
  @Input() competenciasPrograma: { id: number; descripcion: string, nivel:string }[] = [];
  emitirCompetencia(competencia: any) {
    this.crear.emit(competencia);
  }
}
