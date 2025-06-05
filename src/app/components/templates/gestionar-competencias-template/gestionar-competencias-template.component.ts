import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../molecules/icon-button/icon-button.component';
import { CompetenciasTableComponent } from '../../organisms/competencias-table/competencias-table.component';

@Component({
  standalone: true,
  selector: 'app-gestionar-competencias-template',
  imports: [CommonModule, IconButtonComponent, CompetenciasTableComponent],
  templateUrl:'./gestionar-competencias-template.component.html'
})
export class GestionarCompetenciasTemplateComponent {
  @Input() titulo: string = '';
  @Input() rutaRA!: string;
  @Input() rutaEditar!: string;
    @Input() rutaVer!: string;
   @Input() routerLink?: any[];
  @Input() competencias: any[] = [];
  @Output() eliminarCompetencia = new EventEmitter<number>();
}
