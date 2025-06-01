import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-competencia-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './competencia-form.component.html',
  styleUrl: './competencia-form.component.css',
})
export class CompetenciaFormComponent {
  @Input() mostrarVinculacion: boolean = true;
  @Input() competenciasPrograma: {
    id: number;
    descripcion: string;
    nivel: string;
  }[] = [];

  @Output() crear = new EventEmitter<any>();

  nombre:string = '';
  descripcion = '';
  descripcionRA = '';
  nivel = '';
  competenciasSeleccionadas: number[] = [];

  niveles = [
    { label: 'Básico', value: 'basico' },
    { label: 'Intermedio', value: 'intermedio' },
    { label: 'Avanzado', value: 'avanzado' },
  ];

  agregar() {
    if (!this.nombre || !this.descripcion || !this.descripcionRA || !this.nivel)
      return;

    this.crear.emit({
      nombre: this.nombre,
      descripcion: this.descripcion,
      descripcionRA: this.descripcionRA,
      nivel: this.nivel,
      vinculacionPrograma: this.competenciasSeleccionadas,
    });

    // Limpiar formulario
    this.nombre = '';
    this.descripcion = '';
    this.descripcionRA = '';
    this.nivel = '';
    this.competenciasSeleccionadas = [];
  }

  toggleSeleccion(id: number, seleccionado: boolean) {
    if (seleccionado) {
      if (!this.competenciasSeleccionadas.includes(id)) {
        this.competenciasSeleccionadas.push(id);
      }
    } else {
      this.competenciasSeleccionadas = this.competenciasSeleccionadas.filter(
        (c) => c !== id
      );
    }
  }

  onCheckboxChange(event: Event, id: number) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    this.toggleSeleccion(id, checked);
  }
}
