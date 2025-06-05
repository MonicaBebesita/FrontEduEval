// src/app/components/organisms/ra-modal-form/ra-modal-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input-component/input-component.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  standalone: true,
  selector: 'app-ra-modal-form',
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './ra-modal-form.component.html'
})
export class RaModalFormComponent {
  @Output() crear = new EventEmitter<any>();
  descripcion = '';

  crearRa() {
    if (!this.descripcion) return;
    this.crear.emit({ descripcion: this.descripcion, fecha: new Date() });
    this.descripcion = '';
  }
}
