import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input-component/input-component.component';
import { SelectComponent } from '../../atoms/select-component/select-component.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-competencia-form',
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: './competencia-form.component.html',
  styleUrl: './competencia-form.component.css',
})
export class CompetenciaFormComponent {
  @Output() crear = new EventEmitter<any>();

  nombre = '';
  descripcion = '';
  descripcionRA = '';
  nivel = '';

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
    });

    // Limpiar formulario
    this.nombre = '';
    this.descripcion = '';
    this.descripcionRA = '';
    this.nivel = '';
  }
}
