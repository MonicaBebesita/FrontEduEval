// src/app/atoms/asignatura-card/asignatura-card.component.ts
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
      [routerLink]="['/asignatura', id]"
    >
      <div class="card-body">
        <h5 class="card-title">{{ nombre }}</h5>
        <p class="card-text">{{ descripcion }}</p>
      </div>
    </div>
  `,
})
export class AsignaturaCardComponent {
  @Input() id = '';
  @Input() nombre = '';
  @Input() descripcion = '';
  @Input() color = '#007bff'; // Azul por defecto
}
