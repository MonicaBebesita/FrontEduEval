// src/app/pages/programa/agregar-ra/agregar-ra.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgregarRaTemplateComponent } from '../../../components/templates/agregar-ra-template/agregar-ra-template.component';

@Component({
  standalone: true,
  imports: [CommonModule, AgregarRaTemplateComponent],
  template: `<app-agregar-ra-template
    [resultados]="filtrados"
    [fecha]="fechaFiltro"
    (crearRa)="crearRA($event)"
    (anadirRa)="anadirRA($event)"
    (fechaChange)="fechaFiltro = $event"
  />`,
})
export class AgregarRaComponent {
  competenciaId: string;
  resultados = [
    { id: 1, descripcion: 'RA 1', fecha: new Date('2025-05-01') },
    { id: 2, descripcion: 'RA 2', fecha: new Date('2025-05-10') },
  ];
  fechaFiltro = '';

  constructor(private route: ActivatedRoute) {
    this.competenciaId = this.route.snapshot.params['id'];
  }

  get filtrados() {
    if (!this.fechaFiltro)
      return this.resultados.sort(
        (a, b) => +new Date(b.fecha) - +new Date(a.fecha)
      );
    return this.resultados
      .filter((ra) =>
        new Date(ra.fecha).toISOString().startsWith(this.fechaFiltro)
      )
      .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha));
  }

  crearRA(nuevoRA: any) {
    const nuevo = { ...nuevoRA, id: this.resultados.length + 1 };
    this.resultados.push(nuevo);
  }

  anadirRA(ra: any) {
    if (confirm(`¿Deseas añadir el RA "${ra.descripcion}" a la competencia?`)) {
      console.log(`RA ${ra.id} añadido a competencia ${this.competenciaId}`);
    }
  }
}
