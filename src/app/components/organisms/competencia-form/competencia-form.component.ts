import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // FormsModule ya está importado, genial
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
  styleUrl: './competencia-form.component.css',
})
export class CompetenciaFormComponent {
  @Input() mostrarVinculacion: boolean = true;
  @Input() competenciasPrograma: { id: number; descripcion: string; nivel: string }[] = [];

  @Output() crear = new EventEmitter<any>();

  // Propiedades para los [(ngModel)]
  idPrograma: number | null = null; 
  descripcion = '';
  descripcionRA = '';
  nivel: number | null = null; 
  competenciasSeleccionadas: number[] = [];

  niveles = [
    { label: 'Básico', value: 1 }, 
    { label: 'Medio', value: 2 },
    { label: 'Avanzado', value: 3 },
  ];


  onSubmit() {

    // Validciones
    if (this.idPrograma === null || this.idPrograma <= 0) {
        alert('El ID del programa es requerido y debe ser un número válido.');
        return;
    }
    if (!this.descripcion || this.descripcion.trim() === '') {
        alert('La descripción de la competencia es requerida.');
        return;
    }
    if (!this.descripcionRA || this.descripcionRA.trim() === '') {
        alert('La descripción del Resultado de Aprendizaje es requerida.');
        return;
    }
    if (this.nivel === null || ![1, 2, 3].includes(this.nivel)) {
        alert('El nivel es requerido y debe ser Básico, Medio o Avanzado.');
        return;
    }


    
    this.crear.emit({
      id_programa: this.idPrograma,
      descripcion: this.descripcion, // Usa 'descripcion' que es el nombre del campo en el modelo de Django
      nivel: this.nivel,
      resultados_aprendizaje: [{
        descripcion: this.descripcionRA
      }],
     
    });

    // Limpiar formulario después de emitir
    this.idPrograma = null;
    this.descripcion = '';
    this.descripcionRA = '';
    this.nivel = null;
    this.competenciasSeleccionadas = [];
  }


  toggleSeleccion(id: number, seleccionado: boolean) {
    if (seleccionado) {
      if (!this.competenciasSeleccionadas.includes(id)) {
        this.competenciasSeleccionadas.push(id);
      }
    } else {
      this.competenciasSeleccionadas = this.competenciasSeleccionadas.filter((c) => c !== id);
    }
  }

  onCheckboxChange(event: Event, id: number) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    this.toggleSeleccion(id, checked);
  }
}