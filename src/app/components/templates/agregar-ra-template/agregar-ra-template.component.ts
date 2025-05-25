// src/app/components/templates/agregar-ra-template/agregar-ra-template.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FechaFiltroComponent } from '../../molecules/fecha-filtro/fecha-filtro.component';
import { RaTableComponent } from '../../organisms/ra-table/ra-table.component';
import { RaModalFormComponent } from '../../organisms/ra-modal-form/ra-modal-form.component';

@Component({
  standalone: true,
  selector: 'app-agregar-ra-template',
  imports: [
    CommonModule,
    ButtonComponent,
    FechaFiltroComponent,
    RaTableComponent,
    RaModalFormComponent,
  ],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Agregar Resultados de Aprendizaje</h2>
        <app-button
          btnClass="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalRA"
        >
          <i class="bi bi-plus-lg me-1"></i> Nuevo Resultado de Aprendizaje
        </app-button>
      </div>

      <app-fecha-filtro
        [fecha]="fecha"
        (fechaChange)="fechaChange.emit($event)"
      />
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>Añade RA de otros semestres!</h3>
      </div>

      <app-ra-table
        [resultados]="resultados"
        (anadirRa)="anadirRa.emit($event)"
      />

      <app-ra-modal-form (crear)="crearRa.emit($event)" />
    </div>
  `,
})
export class AgregarRaTemplateComponent {
  @Input() resultados: any[] = [];
  @Input() fecha = '';
  @Output() fechaChange = new EventEmitter<string>();
  @Output() crearRa = new EventEmitter<any>();
  @Output() anadirRa = new EventEmitter<any>();
}
