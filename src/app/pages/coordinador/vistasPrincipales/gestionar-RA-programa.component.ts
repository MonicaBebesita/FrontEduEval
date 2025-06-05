import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-programa-ra',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Resultados de aprendizaje del programa</h2>
        <button class="btn btn-primary" (click)="abrirModalAnadir()">
          Añadir RA
        </button>
      </div>

      <ul class="list-group">
        <li
          *ngFor="let ra of raList"
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div>
            <h5>ID: {{ ra.id }}</h5>
            <p><strong>Descripción:</strong> {{ ra.descripcion }}</p>
          </div>
          <div class="d-flex flex-column gap-2">
            <button
              class="btn btn-sm btn-outline-secondary"
              (click)="abrirModalEditar(ra)"
            >
              Editar
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              (click)="eliminarRA(ra.id)"
            >
              Eliminar
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal Añadir -->
    <div class="modal d-block" tabindex="-1" *ngIf="modalAnadirVisible">
      <div class="modal-dialog">
        <div class="modal-content">
          <form (ngSubmit)="guardarNuevoRA()">
            <div class="modal-header">
              <h5 class="modal-title">Añadir RA</h5>
              <button
                type="button"
                class="btn-close"
                (click)="cerrarModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  [(ngModel)]="nuevaDescripcion"
                  name="nuevaDescripcion"
                  required
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                (click)="cerrarModal()"
              >
                Cancelar
              </button>
              <button class="btn btn-success" type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div class="modal d-block" tabindex="-1" *ngIf="modalEditarVisible">
      <div class="modal-dialog">
        <div class="modal-content">
          <form (ngSubmit)="guardarEdicionRA()">
            <div class="modal-header">
              <h5 class="modal-title">Editar RA</h5>
              <button
                type="button"
                class="btn-close"
                (click)="cerrarModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  [(ngModel)]="descripcionEditada"
                  name="descripcionEditada"
                  required
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                (click)="cerrarModal()"
              >
                Cancelar
              </button>
              <button class="btn btn-primary" type="submit">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal {
        background-color: rgba(0, 0, 0, 0.5);
      }
    `,
  ],
})
export class ProgramaRaComponent {
  raList = [
    {
      id: 101,
      descripcion:
        'El estudiante debe ser capaz de diseñar interfaces de usuario accesibles.',
    },
    {
      id: 102,
      descripcion:
        'El estudiante debe ser capaz de desarrollar aplicaciones web responsivas.',
    },
    {
      id: 103,
      descripcion:
        'El estudiante debe ser capaz de aplicar principios de diseño centrado en el usuario.',
    },
  ];

  modalAnadirVisible = false;
  modalEditarVisible = false;

  nuevaDescripcion = '';
  descripcionEditada = '';
  raEditando: any = null;

  abrirModalAnadir() {
    this.nuevaDescripcion = '';
    this.modalAnadirVisible = true;
  }

  abrirModalEditar(ra: any) {
    this.raEditando = ra;
    this.descripcionEditada = ra.descripcion;
    this.modalEditarVisible = true;
  }

  cerrarModal() {
    this.modalAnadirVisible = false;
    this.modalEditarVisible = false;
    this.raEditando = null;
  }

  guardarNuevoRA() {
    const nuevoRA = {
      id: this.generarNuevoId(),
      descripcion: this.nuevaDescripcion.trim(),
    };
    this.raList.push(nuevoRA);
    this.cerrarModal();
  }

  guardarEdicionRA() {
    if (this.raEditando) {
      this.raEditando.descripcion = this.descripcionEditada.trim();
    }
    this.cerrarModal();
  }

  eliminarRA(id: number) {
    if (confirm('¿Estás seguro de eliminar este resultado de aprendizaje?')) {
      this.raList = this.raList.filter((ra) => ra.id !== id);
    }
  }

  generarNuevoId(): number {
    const ids = this.raList.map((r) => r.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
