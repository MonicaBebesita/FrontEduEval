import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-gestionar-rubricas',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mt-4">
      <h2>RA de: {{ asignaturaId }}</h2>

      <button class="btn btn-primary mb-3" (click)="mostrarModalCrear = true">
        Añadir RA
      </button>

      <div *ngFor="let grupo of raAgrupados" class="mb-4">
        <h4>{{ grupo.competencia }}</h4>
        <ul class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            *ngFor="let ra of grupo.ras"
          >
            <div>
              <strong>{{ ra.descripcion }}</strong
              ><br />
              <small>Creado: {{ ra.fecha }}</small>
            </div>
            <div>
              <a
                class="btn btn-outline-success btn-sm me-2"
                [routerLink]="['/uwu', ra.id]"
              >
                <i class="bi bi-plus-circle"></i> Rubricas
              </a>

              <button
                class="btn btn-outline-primary btn-sm me-2"
                (click)="editarRA(ra)"
              >
                <i class="bi bi-pencil"></i> Editar
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                (click)="eliminarRA(ra)"
              >
                <i class="bi bi-trash"></i> Eliminar RA
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Modal Crear RA -->
      <div
        class="modal fade show d-block"
        *ngIf="mostrarModalCrear"
        tabindex="-1"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <form (ngSubmit)="crearRA()">
              <div class="modal-header">
                <h5 class="modal-title">Añadir nuevo RA</h5>
                <button
                  type="button"
                  class="btn-close"
                  (click)="cerrarModalCrear()"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label>Descripción del RA</label>
                  <textarea
                    [(ngModel)]="nuevoRA.descripcion"
                    name="descripcion"
                    class="form-control"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label>Competencia</label>
                  <select
                    [(ngModel)]="nuevoRA.competencia"
                    name="competencia"
                    class="form-select"
                    required
                  >
                    <option
                      *ngFor="let comp of competenciasAsignatura"
                      [value]="comp"
                    >
                      {{ comp }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="cerrarModalCrear()"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal Editar RA -->
      <div class="modal fade show d-block" *ngIf="raEnEdicion" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <form (ngSubmit)="guardarEdicionRA()">
              <div class="modal-header">
                <h5 class="modal-title">Editar RA</h5>
                <button
                  type="button"
                  class="btn-close"
                  (click)="cerrarModalEditar()"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label>Descripción</label>
                  <textarea
                    [(ngModel)]="raEnEdicion.descripcion"
                    name="descripcion"
                    class="form-control"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label>Competencia</label>
                  <select
                    [(ngModel)]="raEnEdicion.competencia"
                    name="competencia"
                    class="form-select"
                    required
                  >
                    <option
                      *ngFor="let comp of competenciasAsignatura"
                      [value]="comp"
                    >
                      {{ comp }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="cerrarModalEditar()"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GestionarRubricasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  asignaturaId = '';
  mostrarModalCrear = false;
  raEnEdicion: any = null;

  competenciasAsignatura = ['Resolver ecuaciones', 'Analizar funciones'];

  raAgrupados: {
    competencia: string;
    ras: {
      id: number;
      descripcion: string;
      fecha: string;
      competencia: string;
    }[];
  }[] = [];

  nuevoRA = {
    descripcion: '',
    competencia: '',
  };

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('id') || '';
    this.raAgrupados = [
      {
        competencia: 'Resolver ecuaciones',
        ras: [
          {
            id: 1,
            descripcion:
              'Aplica métodos algebraicos para resolver ecuaciones lineales y cuadráticas.',
            fecha: '2024-01-12',
            competencia: 'Resolver ecuaciones',
          },
          {
            id: 2,
            descripcion:
              'Resuelve sistemas de ecuaciones usando métodos gráficos y algebraicos.',
            fecha: '2024-02-03',
            competencia: 'Resolver ecuaciones',
          },
        ],
      },
      {
        competencia: 'Analizar funciones',
        ras: [
          {
            id: 3,
            descripcion:
              'Interpreta el comportamiento de funciones polinómicas a partir de su gráfica.',
            fecha: '2024-04-18',
            competencia: 'Analizar funciones',
          },
        ],
      },
    ];
  }



  eliminarRA(ra: any) {
    if (confirm(`¿Eliminar el RA "${ra.descripcion}"?`)) {
      this.raAgrupados = this.raAgrupados.map((grupo) => ({
        ...grupo,
        ras: grupo.ras.filter((r) => r.id !== ra.id),
      }));
    }
  }

  crearRA() {
    const nuevo = {
      id: Date.now(),
      descripcion: this.nuevoRA.descripcion,
      fecha: new Date().toISOString().split('T')[0],
      competencia: this.nuevoRA.competencia,
    };

    const grupo = this.raAgrupados.find(
      (g) => g.competencia === nuevo.competencia
    );
    if (grupo) {
      grupo.ras.push(nuevo);
    } else {
      this.raAgrupados.push({
        competencia: nuevo.competencia,
        ras: [nuevo],
      });
    }

    this.nuevoRA = { descripcion: '', competencia: '' };
    this.mostrarModalCrear = false;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
    this.nuevoRA = { descripcion: '', competencia: '' };
  }

  editarRA(ra: any) {
    this.raEnEdicion = { ...ra };
  }

  guardarEdicionRA() {
    this.raAgrupados.forEach((grupo) => {
      grupo.ras = grupo.ras.map((r) =>
        r.id === this.raEnEdicion.id
          ? { ...this.raEnEdicion, fecha: r.fecha }
          : r
      );
    });

    // Mover a nuevo grupo si la competencia cambió
    const originalGrupo = this.raAgrupados.find((g) =>
      g.ras.some((r) => r.id === this.raEnEdicion.id)
    );
    if (
      originalGrupo &&
      originalGrupo.competencia !== this.raEnEdicion.competencia
    ) {
      const raActualizado = originalGrupo.ras.find(
        (r) => r.id === this.raEnEdicion.id
      );
      originalGrupo.ras = originalGrupo.ras.filter(
        (r) => r.id !== this.raEnEdicion.id
      );

      let nuevoGrupo = this.raAgrupados.find(
        (g) => g.competencia === this.raEnEdicion.competencia
      );
      if (!nuevoGrupo) {
        nuevoGrupo = { competencia: this.raEnEdicion.competencia, ras: [] };
        this.raAgrupados.push(nuevoGrupo);
      }
      nuevoGrupo.ras.push(this.raEnEdicion);
    }

    this.raEnEdicion = null;
  }

  cerrarModalEditar() {
    this.raEnEdicion = null;
  }
}
