import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Criterio, Rubrica } from '../../../modelos/rubrica';
import { ResultadoAprendizajeAsignatura } from '../../../modelos/resultado-aprendizaje-asignatura'; // Make sure this is the original model
import { CompetenciaAsignaturaService } from '../../../services/asignatura.service';
import { RAyRubricaService } from '../../../services/RAyRubrica.service';

// Define una interfaz local para la rúbrica con la propiedad expandido para el UI
interface RubricaConUI extends Rubrica {
  expandido?: boolean; // Propiedad opcional para el estado de la UI
  criterios?: Criterio[]; // También para los criterios, si los cargas dinámicamente
}

// Define una interfaz local para el ResultadoAprendizajeAsignatura con la rúbrica extendida Y su propio 'expandido'
interface ResultadoAprendizajeAsignaturaConUI extends ResultadoAprendizajeAsignatura {
  rubrica?: RubricaConUI; // La rúbrica anidada también usa la interfaz con UI properties
  expandido?: boolean; // Propiedad opcional para el estado de la UI del RA
}

@Component({
  standalone: true,
  selector: 'app-gestionar-ra-asignatura',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestionar-ra-asignatura.component.html',
  styleUrl: './gestionar-ra-asignatura.component.css',
})
export class GestionarRAporAsignaturaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private competenciaAsignaturaService = inject(CompetenciaAsignaturaService);
  private rubricaService = inject(RAyRubricaService);

  asignaturaId: number | null = null;
  mostrarModalCrear = false;
  raEnEdicion: ResultadoAprendizajeAsignatura | null = null; // This one should remain as original model if sent to backend
  raParaNuevaRubrica: ResultadoAprendizajeAsignatura | null = null; // This too
  nuevoNombreRubrica: string = '';
  rubricaEnEdicion: { ra: ResultadoAprendizajeAsignatura; rubricaData: RubricaConUI } | null = null;

  competenciasAsignaturaNombres: string[] = [];
  competenciasAsignaturaMap: Map<string, number> = new Map();

  // Estructura para mostrar los datos
  raAgrupados: {
    competencia: string;
    competenciaId: number;
    expandido: boolean; // This 'expandido' is for the COMPETENCE group (remains the same)
    ras: ResultadoAprendizajeAsignaturaConUI[]; // AHORA USAMOS LA NUEVA INTERFAZ PARA LOS RAS
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
            expandido: false, // This 'expandido' is for the competence group
            // Mapeamos los RAs para incluir la propiedad `expandido` y `rubrica` con sus UI properties
            ras: (comp.resultados_aprendizaje || []).map(ra => {
              const raConUI: ResultadoAprendizajeAsignaturaConUI = { ...ra, expandido: false }; // Añadir 'expandido' aquí
              if (raConUI.rubrica) {
                raConUI.rubrica = { ...raConUI.rubrica, expandido: false }; // Y para la rúbrica si existe
              }
              return raConUI;
            }),
          };
        });

        // Para cada RA, si tiene una rúbrica vinculada, cargar sus criterios
        this.raAgrupados.forEach(grupo => {
          grupo.ras.forEach(ra => { // 'ra' es ahora de tipo ResultadoAprendizajeAsignaturaConUI
            if (ra.rubrica) {
              const rubricaId = ra.rubrica.id;
              if (rubricaId) {
                this.rubricaService.obtenerRubricaPorId(rubricaId).subscribe({
                  next: (rubricaCompleta) => {
                    if (ra.rubrica) {
                      ra.rubrica = { ...rubricaCompleta, expandido: false };
                    }
                  },
                  error: (err) => console.error('Error cargando rúbrica completa para RA', ra.id, err),
                });
              }
            }
          });
        });

        console.log('Datos de competencias y RA cargados:', this.raAgrupados);
      },
      error: (err) => {
        console.error('Error al cargar competencias y RA de la asignatura:', err);
        alert('Error al cargar las competencias y resultados de aprendizaje.');
      },
    });
  }

  // --- Métodos de CRUD para RA (mantienen el modelo original para enviar al backend) ---

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
          // Eliminar del frontend sin recargar todo, asegurando que se filtran los tipos correctos
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
    const competenciaNombre = Array.from(this.competenciasAsignaturaMap.entries())
                                  .find(([nombre, id]) => id === ra.competencia)?.[0];
    if (this.raEnEdicion && competenciaNombre) {
        (this.raEnEdicion as any).competenciaNombre = competenciaNombre;
    }
  }

  guardarEdicionRA() {
    if (this.raEnEdicion && this.raEnEdicion.id !== undefined) {
      const competenciaIdActualizada = this.competenciasAsignaturaMap.get((this.raEnEdicion as any).competenciaNombre);

      const dataToUpdate = {
        descripcion: this.raEnEdicion.descripcion,
        competencia: competenciaIdActualizada || this.raEnEdicion.competencia,
        activo: this.raEnEdicion.activo
      };

      this.rubricaService.editarResultadoAprendizaje(this.raEnEdicion.id, dataToUpdate).subscribe({
        next: (updatedRa) => {
          alert('RA editado exitosamente.');
          this.cargarDatosAsignatura();
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
      const data: { nombre: string; resultado_aprendizaje: number } = {
        nombre: this.nuevoNombreRubrica.trim(),
        resultado_aprendizaje: this.raParaNuevaRubrica.id!,
      };

      this.rubricaService.crearRubrica(data).subscribe({
        next: (newRubrica) => {
          alert('Rúbrica creada y vinculada exitosamente.');
          if (this.raParaNuevaRubrica) {
            const raIndex = this.raAgrupados.findIndex(g => g.ras.some(r => r.id === this.raParaNuevaRubrica?.id));
            if (raIndex !== -1) {
                // Asegúrate de que el RA encontrado sea del tipo con las propiedades de UI
                const raEnGrupo: ResultadoAprendizajeAsignaturaConUI | undefined = this.raAgrupados[raIndex].ras.find(r => r.id === this.raParaNuevaRubrica?.id);
                if (raEnGrupo) {
                    raEnGrupo.rubrica = { ...newRubrica, expandido: false }; // Añade expandido para UI
                }
            }
          }
          this.cancelarCrearRubrica();
        },
        error: (err) => {
          console.error('Error al crear rúbrica:', err);
          alert('Error al crear la rúbrica.');
        },
      });
    }
  }

  cancelarCrearRubrica() {
    this.raParaNuevaRubrica = null;
    this.nuevoNombreRubrica = '';
  }

  editarRubrica(ra: ResultadoAprendizajeAsignaturaConUI) { // Usa la interfaz extendida
    if (ra.rubrica) {
      this.rubricaEnEdicion = {
        ra,
        rubricaData: { ...ra.rubrica } // Copia la rúbrica para edición, incluyendo expandido
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
            this.rubricaEnEdicion.ra.rubrica = { ...updatedRubrica, expandido: true } as RubricaConUI;
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

  eliminarRubrica(ra: ResultadoAprendizajeAsignaturaConUI) { // Usa la interfaz extendida
    if (ra.rubrica && ra.rubrica.id !== undefined) {
      if (confirm(`¿Está seguro de eliminar la rúbrica "${ra.rubrica.nombre}"?`)) {
        this.rubricaService.eliminarRubrica(ra.rubrica.id).subscribe({
          next: () => {
            alert('Rúbrica eliminada exitosamente.');
            ra.rubrica = undefined;
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
  toggleRA(ra: ResultadoAprendizajeAsignaturaConUI) { // Ahora 'ra' sí tiene 'expandido'
    if (ra) {
      ra.expandido = !ra.expandido;
      if (ra.expandido && ra.rubrica && ra.rubrica.id && !ra.rubrica.criterios) {
          this.rubricaService.listarCriteriosPorRubrica(ra.rubrica.id).subscribe({
              next: (criterios) => {
                  if (ra.rubrica) {
                      ra.rubrica.criterios = criterios;
                  }
                  console.log('Criterios cargados:', criterios);
              },
              error: (err) => console.error('Error cargando criterios:', err)
          });
      }
    }
  }


   eliminarCriterio(rubrica: any, criterioAEliminar: any): void {
    if (!rubrica || !rubrica.criterios || !criterioAEliminar) {
      this.mostrarMensaje('error', 'Error: Datos inválidos para eliminar el criterio.');
      console.error('Rubrica o criterio no definidos:', { rubrica, criterioAEliminar });
      return;
    }

    // 1. Confirmación (altamente recomendado en una aplicación real)
    const confirmacion = confirm(`¿Está seguro de que desea eliminar el criterio "${criterioAEliminar.descripcion}"?`);

    if (!confirmacion) {
      this.mostrarMensaje('info', 'Eliminación del criterio cancelada.');
      return;
    }

    // 2. Simulación de llamada a un servicio backend para eliminar el criterio
    // En una aplicación real, aquí llamarías a this.criterioService.delete(criterioAEliminar.id)
    // y manejarías la respuesta (Observable/Promise).

    console.log(`Simulando eliminación del criterio con ID: ${criterioAEliminar.id} del backend...`);
    // Para la simulación, asumimos que la eliminación en el backend fue exitosa.
    const eliminacionBackendExitosa = true; // Cambia a false para simular un error del backend

    if (eliminacionBackendExitosa) {
      // 3. Eliminar el criterio de la lista local en la rúbrica
      const index = rubrica.criterios.findIndex((c: any) => c.id === criterioAEliminar.id); // Asume que cada criterio tiene un 'id' único

      if (index > -1) {
        rubrica.criterios.splice(index, 1); // Elimina 1 elemento en la posición 'index'
        this.mostrarMensaje('success', `Criterio "${criterioAEliminar.descripcion}" eliminado exitosamente.`);
        console.log('Criterio eliminado de la lista local:', criterioAEliminar);
        console.log('Estado actual de los criterios de la rúbrica:', rubrica.criterios);
      } else {
        this.mostrarMensaje('error', 'Error: El criterio no se encontró en la lista local para ser eliminado.');
        console.warn('No se encontró el criterio en la lista:', criterioAEliminar, 'en rubrica.criterios:', rubrica.criterios);
      }
    } else {
      // Si la simulación de eliminación en backend falla
      this.mostrarMensaje('error', `Error al intentar eliminar el criterio "${criterioAEliminar.descripcion}" del servidor (simulado).`);
      console.error('Fallo simulado en la eliminación del backend para el criterio:', criterioAEliminar);
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
        // Ejemplo: this.messageService.success(mensaje);
        break;
      case 'error':
        console.error(`%c ERROR: ${mensaje}`, 'color: red; font-weight: bold;');
        // Ejemplo: this.messageService.error(mensaje);
        break;
      case 'info':
        console.info(`%cℹ INFO: ${mensaje}`, 'color: blue; font-weight: bold;');
        // Ejemplo: this.messageService.info(mensaje);
        break;
      case 'warning':
        console.warn(`%c WARNING: ${mensaje}`, 'color: orange; font-weight: bold;');
        // Ejemplo: this.messageService.warning(mensaje);
        break;
    }
  }





  toggleRubrica(rubrica: RubricaConUI) {
    if (rubrica) {
      rubrica.expandido = !rubrica.expandido;
      if (rubrica.expandido && rubrica.id && !rubrica.criterios) {
          this.rubricaService.listarCriteriosPorRubrica(rubrica.id).subscribe({
              next: (criterios) => {
                  rubrica.criterios = criterios;
                  console.log('Criterios cargados:', criterios);
              },
              error: (err) => console.error('Error cargando criterios:', err)
          });
      }
    }
  }
}