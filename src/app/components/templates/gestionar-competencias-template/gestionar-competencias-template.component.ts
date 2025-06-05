// src/app/components/templates/gestionar-competencias-template/gestionar-competencias-template.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

@Component({
  standalone: true,
  selector: 'app-gestionar-competencias-template',
  imports: [CommonModule, IconButtonComponent,RouterModule, CompetenciasTableComponent],
  templateUrl:'./gestionar-competencias-template.component.html'
})
export class GestionarCompetenciasTemplateComponent {
  @Input() titulo: string = 'Gestionar Competencias';
  @Input() competencias: any[] = []; // Puede ser CompetenciaAsignatura[] si mapeas el nivel
  @Input() rutaRA: string = '';
  @Input() rutaEditar: string = '';
  @Input() rutaVer: string = '';
  @Input() routerLinkCrear: any[] | string | null = null; // Para el routerLink del botón crear

  @Output() eliminarCompetencia = new EventEmitter<number>();
}