// src/app/components/atoms/asignatura-card/asignatura-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-asignatura-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asignatura-card.component.html'
})
export class AsignaturaCardComponent {
  @Input() id!: number; // Ahora es numérico
  @Input() nombre = '';
  @Input() descripcion = '';
  @Input() color = '#007bff';
  @Input() rutaBase!: string; // La base de la ruta, ej. '/asignatura'
}
