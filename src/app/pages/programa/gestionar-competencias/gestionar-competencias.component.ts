import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarCompetenciasTemplateComponent } from '../../../components/templates/gestionar-competencias-template/gestionar-competencias-template.component';

@Component({
  standalone: true,
  selector: 'app-gestionar-competencias',
  imports: [CommonModule, GestionarCompetenciasTemplateComponent],
  template: `
    <app-gestionar-competencias-template
      [competencias]="competencias"
      (eliminarCompetencia)="eliminarCompetencia($event)"
    >
    </app-gestionar-competencias-template>
  `,
})
export class GestionarCompetenciasComponent {
  competencias = [
    { id: 1, descripcion: 'Resolver problemas', nivel: 'avanzado' },
    { id: 2, descripcion: 'Pensamiento crítico', nivel: 'básico' },
  ];

  eliminarCompetencia(id: number) {
    console.log('Eliminar competencia con ID:', id);
    this.competencias = this.competencias.filter((c) => c.id !== id);
  }
}
