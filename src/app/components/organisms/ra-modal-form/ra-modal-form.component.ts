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
  template: `
    <div class="modal fade" id="modalRA" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <form class="modal-content" (ngSubmit)="crearRa()">
          <div class="modal-header">
            <h5 class="modal-title">Nuevo Resultado de Aprendizaje</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <app-input label="Descripción" [(ngModel)]="descripcion" name="descripcion" />
          </div>
          <div class="modal-footer">
            <app-button btnClass="btn btn-primary" type="submit">Crear</app-button>
            <app-button btnClass="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</app-button>
          </div>
        </form>
      </div>
    </div>
  `
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
