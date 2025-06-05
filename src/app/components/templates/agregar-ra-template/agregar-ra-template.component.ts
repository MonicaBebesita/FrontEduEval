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
  templateUrl: './agregar-ra-template.component.html'
  
})
export class AgregarRaTemplateComponent {
  @Input() resultados: any[] = [];
  @Input() fecha = '';
  @Output() fechaChange = new EventEmitter<string>();
  @Output() crearRa = new EventEmitter<any>();
  @Output() anadirRa = new EventEmitter<any>();
}
