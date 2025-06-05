import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-programa-ra',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-RA-programa.component.html',
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
