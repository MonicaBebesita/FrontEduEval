import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../molecules/icon-button/icon-button.component';
import { CompetenciasTableComponent } from '../../organisms/competencias-table/competencias-table.component';

@Component({
  standalone: true,
  selector: 'app-gestionar-competencias-template',
  imports: [CommonModule, IconButtonComponent, CompetenciasTableComponent],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>{{titulo}}</h2>
        <app-icon-button icon="plus-lg" label="Crear Competencia" [routerLink]="['/programa/crear']" />
      </div>

      <app-competencias-table
        [competencias]="competencias"
        (onDelete)="eliminarCompetencia.emit($event)">
      </app-competencias-table>
    </div>
  `
})
export class GestionarCompetenciasTemplateComponent {
  @Input() titulo: string = '';
  @Input() competencias: any[] = [];
  @Output() eliminarCompetencia = new EventEmitter<number>();
}
