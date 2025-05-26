import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GestionarCompetenciasTemplateComponent } from '../../../components/templates/gestionar-competencias-template/gestionar-competencias-template.component';

@Component({
  standalone: true,
  selector: 'competencias-asignatura',
  imports: [CommonModule, GestionarCompetenciasTemplateComponent],
  template: `
    <app-gestionar-competencias-template
      [titulo]="'Competencias de la Asignatura en el Programa: ' + asignaturaId"
      [rutaRA]="'/programa/RAasignatura'"
      rutaEditar="/programa/editarCA"
      rutaVer="/programa/verCA"
      [routerLink]="['/programa/crearCA']"
      [competencias]="competencias"
      (eliminarCompetencia)="eliminarCompetencia($event)"
    >
    </app-gestionar-competencias-template>
  `,
})
export class CompetenciasAsignaturaComponentdePrograma implements OnInit {
  private route = inject(ActivatedRoute);

  asignaturaId: string = '';
  competencias: {
    id: number;
    descripcion: string;
    nivel: string;
    asignaturaId: string;
  }[] = [];

  // Simulación de datos generales
  todasLasCompetencias = [
    {
      id: 1,
      descripcion: 'Resolver ecuaciones',
      nivel: 'basico',
      asignaturaId: 'matematicas',
    },
    {
      id: 2,
      descripcion: 'Analizar funciones',
      nivel: 'intermedio',
      asignaturaId: 'matematicas',
    },
    {
      id: 3,
      descripcion: 'Explicar la fotosíntesis',
      nivel: 'avanzado',
      asignaturaId: 'ciencias',
    },
    {
      id: 4,
      descripcion: 'Interpretar mapas',
      nivel: 'basico',
      asignaturaId: 'geografia',
    },
  ];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.asignaturaId = params.get('id') || '';
      this.cargarCompetencias();
    });
  }

  cargarCompetencias() {
    this.competencias = this.todasLasCompetencias.filter(
      (c) => c.asignaturaId === this.asignaturaId
    );
  }

  eliminarCompetencia(id: number) {
    console.log('Eliminar competencia con ID:', id);
    this.competencias = this.competencias.filter((c) => c.id !== id);
  }
}
