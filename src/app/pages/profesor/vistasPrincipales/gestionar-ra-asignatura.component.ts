// src/app/pages/profesor/vistasSecundarias/gestionar-ra-asignatura.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Criterio, Rubrica } from '../../../modelos/rubrica';
import { ResultadoAprendizajeAsignatura } from '../../../modelos/resultado-aprendizaje-asignatura';
import { RAyRubricaService } from '../../../services/RAyRubrica.service';

interface RubricaConUI extends Rubrica {
  expandido?: boolean; // Propiedad opcional para el estado de la UI
  criterios?: Criterio[]; // Para los criterios, si los cargas dinámicamente
}

interface ResultadoAprendizajeAsignaturaConUI extends ResultadoAprendizajeAsignatura {
  rubrica?: RubricaConUI; 
  expandido?: boolean; 
}

@Component({
  standalone: true,
  selector: 'app-gestionar-ra-asignatura',
  imports: [CommonModule, FormsModule, RouterLink, DatePipe], 
  templateUrl: './gestionar-ra-asignatura.component.html',
  styleUrl: './gestionar-ra-asignatura.component.css',
})
export class GestionarRAporAsignaturaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private rubricaService = inject(RAyRubricaService); 

  asignaturaId: number | null = null;
  mostrarModalCrear = false;
  raEnEdicion: ResultadoAprendizajeAsignatura | null = null;
  raParaNuevaRubrica: ResultadoAprendizajeAsignatura | null = null;
  nuevoNombreRubrica: string = '';
  rubricaEnEdicion: { ra: ResultadoAprendizajeAsignatura; rubricaData: RubricaConUI } | null = null;

  competenciasAsignaturaNombres: string[] = [];
  competenciasAsignaturaMap: Map<string, number> = new Map();

  raAgrupados: {
    competencia: string;
    competenciaId: number;
    expandido: boolean;
    ras: ResultadoAprendizajeAsignaturaConUI[];
  }[] = [];

  nuevoRA = {
    descripcion: '',
    competenciaId: null as number | null,
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.asignaturaId = +id;
        this.cargarDatosAsignatura();
      } else {
        console.error('No se encontró el ID de la asignatura en la ruta.');
        alert('Error: No se encontró el ID de la asignatura.');
      }
    });
  }

  // --- Métodos para cargar datos ---
  cargarDatosAsignatura() {
    if (this.asignaturaId === null) return;

    this.rubricaService.getCompetenciasAsignaturaCompleto(this.asignaturaId).subscribe({
      next: (competencias) => {
        this.raAgrupados = competencias.map((comp) => {
          this.competenciasAsignaturaNombres.push(comp.descripcion);
          this.competenciasAsignaturaMap.set(comp.descripcion, comp.id!);

          return {
            competencia: comp.descripcion,
            competenciaId: comp.id!,
            expandido: false,
            ras: (comp.resultados_aprendizaje || []).map(ra => {
              const raConUI: ResultadoAprendizajeAsignaturaConUI = { ...ra, expandido: false };
              if (ra.rubrica) {
                raConUI.rubrica = { ...(ra.rubrica as Rubrica), expandido: false };
              }
              return raConUI;
            }),
          };
        });

        console.log('Datos de competencias y RA cargados:', this.raAgrupados);
      },
      error: (err) => {
        console.error('Error al cargar competencias y RA de la asignatura:', err);
        alert('Error al cargar las competencias y resultados de aprendizaje.');
      },
    });
  }

  // --- Métodos de CRUD para RA ---

  eliminarRA(ra: ResultadoAprendizajeAsignatura) {
    if (confirm(`¿Está seguro de eliminar el RA "${ra.descripcion}"?`)) {
      if (ra.id === undefined) {
        console.error('El RA no tiene ID para eliminarlo.');
        alert('Error: El RA no tiene ID para eliminar.');
        return;
      }
      this.rubricaService.eliminarResultadoAprendizaje(ra.id).subscribe({
        next: () => {
          alert('RA eliminado exitosamente.');
          // Eliminar del frontend sin recargar todo
          this.raAgrupados.forEach(grupo => {
            grupo.ras = grupo.ras.filter((r: ResultadoAprendizajeAsignaturaConUI) => r.id !== ra.id);
          });
        },
        error: (err) => {
          console.error('Error al eliminar RA:', err);
          alert('Error al eliminar el Resultado de Aprendizaje.');
        },
      });
    }
  }

  editarRA(ra: ResultadoAprendizajeAsignatura) {
    this.raEnEdicion = { ...ra };
    // Encuentra el nombre de la competencia para la edición en el modal
    const competenciaNombre = Array.from(this.competenciasAsignaturaMap.entries())
                                  .find(([nombre, id]) => id === ra.competencia)?.[0];
    if (this.raEnEdicion && competenciaNombre) {
        (this.raEnEdicion as any).competenciaNombre = competenciaNombre; // Añade una propiedad temporal para el select
    }
  }

  guardarEdicionRA() {
    if (this.raEnEdicion && this.raEnEdicion.id !== undefined) {
      // Obtén el ID de la competencia del mapa si se cambió el nombre en el select
      const competenciaIdActualizada = this.competenciasAsignaturaMap.get((this.raEnEdicion as any).competenciaNombre);

      const dataToUpdate = {
        descripcion: this.raEnEdicion.descripcion,
        // Usa el ID actualizado o el original si no se cambió
        competencia: competenciaIdActualizada || this.raEnEdicion.competencia,
        activo: this.raEnEdicion.activo
      };

      this.rubricaService.editarResultadoAprendizaje(this.raEnEdicion.id, dataToUpdate).subscribe({
        next: (updatedRa) => {
          alert('RA editado exitosamente.');
          this.cargarDatosAsignatura(); // Recargar todos los datos para reflejar los cambios
          this.cerrarModalEditar();
        },
        error: (err) => {
          console.error('Error al guardar edición de RA:', err);
          alert('Error al guardar los cambios del Resultado de Aprendizaje.');
        },
      });
    }
  }

  cerrarModalEditar() {
    this.raEnEdicion = null;
  }

  // --- Métodos de CRUD para Rúbrica ---

  crearRubrica(ra: ResultadoAprendizajeAsignatura) {
    this.raParaNuevaRubrica = ra;
    this.nuevoNombreRubrica = '';
  }

  confirmarCrearRubrica() {
    if (this.raParaNuevaRubrica && this.nuevoNombreRubrica.trim()) {
      const raId = this.raParaNuevaRubrica.id;
      if (raId === undefined) {
        alert('Error: No se pudo crear la rúbrica. El RA no tiene ID.');
        return;
      }

      // 1. Crear la rúbrica
      const dataCrearRubrica = {
        nombre: this.nuevoNombreRubrica.trim(),
      };

      this.rubricaService.crearRubrica(dataCrearRubrica).subscribe({
        next: (newRubrica) => {
          console.log('Rúbrica creada exitosamente:', newRubrica);

          // 2. Vincular la rúbrica recién creada al Resultado de Aprendizaje
          if (newRubrica.id) {
            this.rubricaService.vincularRubricaAResultadoAprendizaje(raId, newRubrica.id).subscribe({
              next: (vinculacionResponse) => {
                alert('Rúbrica creada y vinculada exitosamente.');
                console.log('Rúbrica vinculada:', vinculacionResponse);

                // **Actualizar el estado del frontend directamente**
                // Buscar el RA específico en el grupo y actualizar su propiedad `rubrica`
                const grupo = this.raAgrupados.find(g => g.ras.some(r => r.id === raId));
                if (grupo) {
                  const raEnGrupo = grupo.ras.find(r => r.id === raId);
                  if (raEnGrupo) {
                    // Actualiza la rúbrica del RA con la nueva info y expandido a false
                    raEnGrupo.rubrica = { ...newRubrica, expandido: false, criterios: [] };
                  }
                }
                this.cancelarCrearRubrica(); // Cerrar el modal
              },
              error: (errVincular) => {
                console.error('Error al vincular rúbrica:', errVincular);
                alert('Error al vincular la rúbrica al Resultado de Aprendizaje. La rúbrica fue creada, pero no se pudo vincular.');
                this.cancelarCrearRubrica(); // Cerrar el modal
              }
            });
          } else {
            console.error('Error: La rúbrica creada no devolvió un ID.');
            alert('Error al crear la rúbrica: La rúbrica fue creada pero sin ID, no se pudo vincular.');
            this.cancelarCrearRubrica();
          }
        },
        error: (errCrear) => {
          console.error('Error al crear rúbrica:', errCrear);
          alert('Error al crear la rúbrica.');
          this.cancelarCrearRubrica();
        },
      });
    }
  }

  cancelarCrearRubrica() {
    this.raParaNuevaRubrica = null;
    this.nuevoNombreRubrica = '';
  }

  editarRubrica(ra: ResultadoAprendizajeAsignaturaConUI) {
    if (ra.rubrica) {
      this.rubricaEnEdicion = {
        ra,
        rubricaData: { ...ra.rubrica }
      };
    }
  }

  guardarEdicionRubrica() {
    if (this.rubricaEnEdicion && this.rubricaEnEdicion.rubricaData.id !== undefined) {
      const rubricaId = this.rubricaEnEdicion.rubricaData.id;
      const dataToUpdate = { nombre: this.rubricaEnEdicion.rubricaData.nombre };

      this.rubricaService.editarRubrica(rubricaId, dataToUpdate).subscribe({
        next: (updatedRubrica) => {
          alert('Rúbrica editada exitosamente.');
          if (this.rubricaEnEdicion) {
            // Encuentra el RA en el grupo y actualiza su rúbrica
            const grupo = this.raAgrupados.find(g => g.ras.some(r => r.id === this.rubricaEnEdicion?.ra.id));
            if (grupo) {
              const raEnGrupo = grupo.ras.find(r => r.id === this.rubricaEnEdicion?.ra.id);
              if (raEnGrupo) {
                raEnGrupo.rubrica = { ...updatedRubrica, expandido: raEnGrupo.rubrica?.expandido }; // Mantener el estado expandido
              }
            }
          }
          this.cerrarModalEditarRubrica();
        },
        error: (err) => {
          console.error('Error al guardar edición de rúbrica:', err);
          alert('Error al guardar los cambios de la rúbrica.');
        },
      });
    }
  }

  cerrarModalEditarRubrica() {
    this.rubricaEnEdicion = null;
  }

  eliminarRubrica(ra: ResultadoAprendizajeAsignaturaConUI) {
    if (ra.rubrica && ra.rubrica.id !== undefined) {
      if (confirm(`¿Está seguro de eliminar la rúbrica "${ra.rubrica.nombre}"?`)) {
        this.rubricaService.eliminarRubrica(ra.rubrica.id).subscribe({
          next: () => {
            alert('Rúbrica eliminada exitosamente.');
            ra.rubrica = undefined; // Quita la rúbrica del RA en el frontend
          },
          error: (err) => {
            console.error('Error al eliminar rúbrica:', err);
            alert('Error al eliminar la rúbrica.');
          },
        });
      }
    } else {
      console.warn('Intento de eliminar rúbrica sin ID.');
    }
  }

  // --- Métodos de UI ---

  // Este método gestiona la expansión/contracción de un Resultado de Aprendizaje
  toggleRA(ra: ResultadoAprendizajeAsignaturaConUI) {
    if (ra) {
      ra.expandido = !ra.expandido;
      // Ya no se cargan los criterios del RA aquí, se cargan con toggleRubrica
    }
  }

  // Este método gestiona la expansión/contracción de una Rúbrica Y la carga de sus criterios
  toggleRubrica(rubrica: RubricaConUI) {
    if (rubrica) {
      rubrica.expandido = !rubrica.expandido;
      // Solo cargar criterios si se expande la rúbrica y los criterios aún no se han cargado
      if (rubrica.expandido && rubrica.id && (!rubrica.criterios || rubrica.criterios.length === 0)) {
          this.rubricaService.listarCriteriosPorRubrica(rubrica.id).subscribe({
              next: (criterios) => {
                  rubrica.criterios = criterios;
                  console.log('Criterios cargados para rúbrica:', rubrica.id, criterios);
              },
              error: (err) => console.error('Error cargando criterios para rúbrica:', rubrica.id, err)
          });
      }
    }
  }

   eliminarCriterio(rubrica: RubricaConUI, criterioAEliminar: Criterio): void {
    if (!rubrica || !rubrica.criterios || !criterioAEliminar || criterioAEliminar.id === undefined) {
      this.mostrarMensaje('error', 'Error: Datos inválidos para eliminar el criterio.');
      console.error('Rubrica, criterios o criterio no definidos o sin ID:', { rubrica, criterioAEliminar });
      return;
    }

    const confirmacion = confirm(`¿Está seguro de que desea eliminar el criterio "${criterioAEliminar.descripcion}"?`);

    if (!confirmacion) {
      this.mostrarMensaje('info', 'Eliminación del criterio cancelada.');
      return;
    }

    // Llama al servicio para eliminar el criterio en el backend
    // Debes tener un método `eliminarCriterio` en tu `RAyRubricaService` (o un servicio de Criterios)
    // Por ahora, estoy asumiendo que tienes un endpoint para eliminar criterios.
    // Si no lo tienes, deberías crearlo en el backend y el servicio.

    // Ejemplo de llamada simulada o real:
    // this.rubricaService.eliminarCriterio(criterioAEliminar.id).subscribe({
    //   next: () => {
            this.mostrarMensaje('success', `Criterio "${criterioAEliminar.descripcion}" eliminado exitosamente.`);
            rubrica.criterios = rubrica.criterios.filter(c => c.id !== criterioAEliminar.id);
            console.log('Criterio eliminado de la lista local:', criterioAEliminar);
    //   },
    //   error: (err) => {
    //     this.mostrarMensaje('error', `Error al eliminar el criterio "${criterioAEliminar.descripcion}".`);
    //     console.error('Error al eliminar criterio en backend:', err);
    //   }
    // });
    // **NOTA**: He comentado la llamada real al servicio `eliminarCriterio` porque no la proporcionaste.
    // Si la tienes, descoméntala y elimina la lógica de filtrado local si el backend devuelve la lista actualizada o un mensaje de éxito.
    // Por ahora, solo se filtra localmente para que veas el efecto inmediato.
    const index = rubrica.criterios.findIndex((c: any) => c.id === criterioAEliminar.id);
    if (index > -1) {
        rubrica.criterios.splice(index, 1);
    } else {
        this.mostrarMensaje('error', 'Error: El criterio no se encontró en la lista local para ser eliminado.');
    }
  }


 /**
   * Método auxiliar para mostrar mensajes (simulación).
   * Reemplaza esto con tu servicio de notificaciones real (Toastr, NzMessageService, etc.).
   */
  private mostrarMensaje(tipo: 'success' | 'error' | 'info' | 'warning', mensaje: string): void {
    switch (tipo) {
      case 'success':
        console.log(`%c SUCCESS: ${mensaje}`, 'color: green; font-weight: bold;');
        break;
      case 'error':
        console.error(`%c ERROR: ${mensaje}`, 'color: red; font-weight: bold;');
        break;
      case 'info':
        console.info(`%cℹ INFO: ${mensaje}`, 'color: blue; font-weight: bold;');
        break;
      case 'warning':
        console.warn(`%c WARNING: ${mensaje}`, 'color: orange; font-weight: bold;');
        break;
    }
  }
}