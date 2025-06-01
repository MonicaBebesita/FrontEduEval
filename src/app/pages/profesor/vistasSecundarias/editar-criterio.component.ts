import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Nivel {
  descripcion: string;
  nota: number;
}

export interface Criterio {
  nombre: string;
  ponderacion: number;
  niveles: {
    alto: Nivel;
    medio: Nivel;
    bajo: Nivel;
  };
}

@Component({
  selector: 'app-editar-criterio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-criterio.component.html',
  styleUrls: ['./editar-criterio.component.css'],
})
export class EditarCriterioComponent {
  @Input() criterio!: Criterio;
  @Output() guardarCriterio = new EventEmitter<Criterio>();
  @Output() cancelar = new EventEmitter<void>();

  guardar() {
    // Aquí podrías añadir validaciones extra si quieres
    this.guardarCriterio.emit(this.criterio);
  }

  cancelarEdicion() {
    this.cancelar.emit();
  }
}
