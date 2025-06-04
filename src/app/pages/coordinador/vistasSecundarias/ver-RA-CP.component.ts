// src/app/ra-programa/ra-programa.component.ts
import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute para obtener parámetros de la ruta
import { ProgramaService } from '../../../services/programa.service';
import { ResultadoAprendizaje } from '../../../modelos/resultado-aprendizaje';

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-ra-programa',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Resultados de Aprendizaje del Programa</h2>
        <button class="btn btn-primary" (click)="openAddRaModal()">
          Añadir RA
        </button>
      </div>

      <table class="table table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let ra of raList">
            <td>{{ ra.id }}</td>
            <td>{{ ra.descripcion }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-warning me-2"
                (click)="openEditRaModal(ra)"
              >
                Editar
              </button>
              <button
                class="btn btn-sm btn-danger"
                (click)="eliminarRA(ra.id!)"
              >
                Eliminar
              </button>
            </td>
          </tr>
          <tr *ngIf="raList.length === 0">
            <td colspan="3" class="text-center">
              No hay resultados de aprendizaje para mostrar.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="addRaModal"
      tabindex="-1"
      aria-labelledby="addRaModalLabel"
      aria-hidden="true"
      #addModalRef
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRaModalLabel">
              Añadir Nuevo Resultado de Aprendizaje
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              (click)="closeAddRaModal()"
            ></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="submitAddRaForm()">
              <div class="mb-3">
                <label for="newRaDescripcion" class="form-label"
                  >Descripción</label
                >
                <textarea
                  class="form-control"
                  id="newRaDescripcion"
                  [(ngModel)]="newRaDescription"
                  name="descripcion"
                  required
                ></textarea>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="closeAddRaModal()"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Guardar RA
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editRaModal"
      tabindex="-1"
      aria-labelledby="editRaModalLabel"
      aria-hidden="true"
      #editModalRef
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editRaModalLabel">
              Editar Resultado de Aprendizaje
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              (click)="closeEditRaModal()"
            ></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="submitEditRaForm()">
              <div class="mb-3">
                <label for="editRaId" class="form-label">ID del RA</label>
                <input
                  type="text"
                  class="form-control"
                  id="editRaId"
                  [ngModel]="currentRa.id"
                  name="id"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="editRaDescripcion" class="form-label"
                  >Descripción</label
                >
                <textarea
                  class="form-control"
                  id="editRaDescripcion"
                  [(ngModel)]="currentRa.descripcion"
                  name="descripcion"
                  required
                ></textarea>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="closeEditRaModal()"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Actualizar RA
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RaProgramaComponent implements OnInit {
  private programaService = inject(ProgramaService);
  private route = inject(ActivatedRoute); // Inyectar ActivatedRoute

  @ViewChild('addModalRef') addModalRef!: ElementRef;
  @ViewChild('editModalRef') editModalRef!: ElementRef;

  private addBsModal: any;
  private editBsModal: any;

  raList: ResultadoAprendizaje[] = [];

  newRaDescription: string = ''; // Solo la descripción para el nuevo RA
  currentRa: ResultadoAprendizaje = { id: undefined, descripcion: '' }; // Para edición

  // idCompetenciaPadre: Obtener de la ruta
  idCompetenciaPadre: number | null = null;

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta para obtener el ID de la competencia
    // Asumiendo que tu ruta es algo como /competencia/:id/ra
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // 'id' debe coincidir con el nombre del parámetro en tu ruta
      if (id) {
        this.idCompetenciaPadre = +id; // Convierte el string a número
        this.cargarResultadosAprendizaje();
      } else {
        console.warn(
          'Advertencia: No se encontró el ID de la competencia en la ruta. Asegúrate de que la ruta incluya un parámetro de ID (ej. /competencias/123/ra).'
        );
        // Aquí podrías redirigir o mostrar un mensaje al usuario.
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicializar los modales de Bootstrap
    this.addBsModal = new bootstrap.Modal(this.addModalRef.nativeElement);
    this.editBsModal = new bootstrap.Modal(this.editModalRef.nativeElement);
  }

  cargarResultadosAprendizaje(): void {
    if (!this.idCompetenciaPadre) {
      console.warn(
        'No se puede cargar RA: ID de competencia padre no disponible.'
      );
      return;
    }

    this.programaService.listarResultadosAprendizaje().subscribe({
      next: (data) => {
        // Filtrar los RA que pertenecen a la competencia padre si el backend no lo hace directamente
        this.raList = data.filter(
          (ra) => ra.competencia === this.idCompetenciaPadre
        );
        console.log(
          'Resultados de Aprendizaje cargados exitosamente para competencia',
          this.idCompetenciaPadre,
          ':',
          this.raList
        );
      },
      error: (error) => {
        console.error('Error al cargar los Resultados de Aprendizaje:', error);
        alert(
          'Ocurrió un error al cargar los Resultados de Aprendizaje. Por favor, intenta de nuevo más tarde.'
        );
      },
    });
  }

  // --- Lógica de Modales ---

  openAddRaModal(): void {
    this.newRaDescription = ''; // Limpia la descripción para el nuevo RA
    this.addBsModal.show();
  }

  closeAddRaModal(): void {
    this.addBsModal.hide();
  }

  submitAddRaForm(): void {
    if (!this.idCompetenciaPadre) {
      alert('Error: No se ha podido determinar la competencia padre.');
      return;
    }
    if (!this.newRaDescription.trim()) {
      alert('Por favor, ingresa la descripción del Resultado de Aprendizaje.');
      return;
    }

    const newRaData = {
      competencia: this.idCompetenciaPadre, // Envía el ID de la competencia automáticamente
      descripcion: this.newRaDescription,
    };

    this.programaService.crearResultadoAprendizaje(newRaData).subscribe({
      next: (response) => {
        console.log('RA creado exitosamente:', response);
        alert('Resultado de Aprendizaje creado exitosamente.');
        this.closeAddRaModal();
        this.cargarResultadosAprendizaje(); // Recarga la lista para ver el nuevo RA
      },
      error: (error) => {
        console.error('Error al crear RA:', error);
        let errorMessage =
          'Ocurrió un error al crear el Resultado de Aprendizaje.';
        if (error.status === 400 && error.error) {
          try {
            const errorDetails = JSON.stringify(error.error, null, 2);
            errorMessage += `\nDetalles: ${errorDetails}`;
          } catch (e) {
            errorMessage += `\nDetalles: ${error.error}`;
          }
        }
        alert(errorMessage);
      },
    });
  }

  openEditRaModal(ra: ResultadoAprendizaje): void {
    this.currentRa = { ...ra }; // Copia el RA para editar
    this.editBsModal.show();
  }

  closeEditRaModal(): void {
    this.editBsModal.hide();
  }

  submitEditRaForm(): void {
    if (!this.currentRa.id) {
      alert(
        'Error: No se ha podido determinar el ID del Resultado de Aprendizaje a editar.'
      );
      return;
    }
    if (!this.currentRa.descripcion.trim()) {
      alert('La descripción no puede estar vacía.');
      return;
    }

    this.programaService
      .editarResultadoAprendizaje(this.currentRa.id, {
        descripcion: this.currentRa.descripcion,
      })
      .subscribe({
        next: (response) => {
          console.log('RA editado exitosamente:', response);
          alert('Resultado de Aprendizaje actualizado exitosamente.');
          this.closeEditRaModal();
          this.cargarResultadosAprendizaje(); // Recarga la lista para ver el cambio
        },
        error: (error) => {
          console.error('Error al editar RA:', error);
          let errorMessage =
            'Ocurrió un error al actualizar el Resultado de Aprendizaje.';
          if (error.status === 400 && error.error) {
            try {
              const errorDetails = JSON.stringify(error.error, null, 2);
              errorMessage += `\nDetalles: ${errorDetails}`;
            } catch (e) {
              errorMessage += `\nDetalles: ${error.error}`;
            }
          }
          alert(errorMessage);
        },
      });
  }

  eliminarRA(id: number) {
    console.log('Intentando desvincular RA con ID:', id);

    if (
      confirm(
        `¿Estás seguro de que quieres desvincular el Resultado de Aprendizaje con ID ${id}?`
      )
    ) {
      this.programaService.desvincularResultadoAprendizaje(id).subscribe({
        next: () => {
          console.log(`RA con ID ${id} desvinculado exitosamente del backend.`);
          alert('Resultado de Aprendizaje desvinculado exitosamente.');
          this.cargarResultadosAprendizaje(); // Recarga la lista
        },
        error: (error) => {
          console.error(`Error al desvincular RA con ID ${id}:`, error);
          let errorMessage = `Ocurrió un error al desvincular el Resultado de Aprendizaje con ID ${id}.`;
          if (error.status === 404) {
            errorMessage =
              'El Resultado de Aprendizaje no fue encontrado en el servidor.';
          } else if (error.status === 401) {
            errorMessage = 'No autorizado. Por favor, inicia sesión de nuevo.';
          } else if (error.status === 405) {
            errorMessage =
              'Error en el servidor: Método HTTP no permitido para desvincular. Asegúrate de que el backend acepta PATCH.';
          } else if (error.message) {
            errorMessage += `\n${error.message}`;
          }
          alert(errorMessage);
        },
      });
    }
  }
}
