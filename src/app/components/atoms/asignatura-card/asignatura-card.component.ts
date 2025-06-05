// src/app/components/atoms/asignatura-card/asignatura-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-asignatura-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="card text-white mb-3"
      [style.backgroundColor]="color"
      style="cursor: pointer"
      [routerLink]="[rutaBase, id]"
    >
      <div class="card-body">
        <h5 class="card-title">{{ nombre }}</h5>
        <p class="card-text">{{ descripcion }}</p>
      </div>
    </div>
  `,
})
export class AsignaturaCardComponent {
  @Input() id!: number; // Ahora es numérico
  @Input() nombre = '';
  @Input() descripcion = '';
  @Input() color = '#007bff';
  @Input() rutaBase!: string; // La base de la ruta, ej. '/asignatura'
}
