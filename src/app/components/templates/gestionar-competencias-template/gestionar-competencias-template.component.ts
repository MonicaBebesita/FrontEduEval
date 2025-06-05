// src/app/components/templates/gestionar-competencias-template/gestionar-competencias-template.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

@Component({
  standalone: true,
  selector: 'app-gestionar-competencias-template',
  imports: [CommonModule, RouterModule], // Añade RouterModule
  template: `
    <div class="container mt-4">
      <h2 class="mb-3">{{ titulo }}</h2>
      <button class="btn btn-primary mb-3" [routerLink]="routerLinkCrear">
        Crear Nueva Competencia
      </button>

      <div *ngIf="competencias.length === 0" class="alert alert-info">
        No hay competencias para esta asignatura.
      </div>

      <div *ngIf="competencias.length > 0" class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Nivel</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let competencia of competencias">
              <td>{{ competencia.id }}</td>
              <td>{{ competencia.descripcion }}</td>
              <td>{{ competencia.nivel }}</td>
              <td>
                <button class="btn btn-info btn-sm me-2" [routerLink]="[rutaVer, competencia.id]">Ver</button>
                <button class="btn btn-warning btn-sm me-2" [routerLink]="[rutaEditar, competencia.id]">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="eliminarCompetencia.emit(competencia.id)">Eliminar</button>
                <button class="btn btn-secondary btn-sm ms-2" [routerLink]="[rutaRA, competencia.id]">Ver RA</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
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