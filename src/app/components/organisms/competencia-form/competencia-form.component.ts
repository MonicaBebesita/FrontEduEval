import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputComponent } from '../../atoms/input-component/input-component.component';
import { SelectComponent } from '../../atoms/select-component/select-component.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-competencia-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: './competencia-form.component.html',
  styleUrls: ['./competencia-form.component.css'],
})
export class CompetenciaFormComponent {
  @Input() mostrarVinculacion: boolean = true;
  @Input() competenciasPrograma: { id: number; descripcion: string; nivel: string }[] = [];
  @Output() crear = new EventEmitter<any>();

  descripcion = '';
  descripcionRA = '';
  nivel: number | null = null;
  competenciasSeleccionadas: number[] = [];
  formResetToggle = false;
  mensajeExito = '';

  niveles = [
    { label: 'Básico', value: 1 },
    { label: 'Medio', value: 2 },
    { label: 'Avanzado', value: 3 },
  ];

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.crear.emit({
      descripcion: this.descripcion,
      nivel: this.nivel,
      resultados_aprendizaje: [{ descripcion: this.descripcionRA }],
    });

    this.mensajeExito = '¡Competencia creada exitosamente!';
    form.resetForm({
      descripcion: '',
      descripcionRA: '',
      nivel: null
    });

    this.formResetToggle = !this.formResetToggle;

    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  toggleSeleccion(id: number, seleccionado: boolean) {
    if (seleccionado && !this.competenciasSeleccionadas.includes(id)) {
      this.competenciasSeleccionadas.push(id);
    } else {
      this.competenciasSeleccionadas = this.competenciasSeleccionadas.filter((c) => c !== id);
    }
  }

  onCheckboxChange(event: Event, id: number) {
    const input = event.target as HTMLInputElement;
    this.toggleSeleccion(id, input.checked);
  }
}