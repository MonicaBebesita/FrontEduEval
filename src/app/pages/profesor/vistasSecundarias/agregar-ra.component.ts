import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultadoAprendizajeAsignatura } from '../../../modelos/resultado-aprendizaje-asignatura'; // Importa el modelo
import { RAyRubricaService } from '../../../services/RAyRubrica.service';

declare var bootstrap: any; // Para los modales de Bootstrap

@Component({
  standalone: true,
  selector: 'app-agregar-ra',
  templateUrl: './agregar-ra.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AgregarRaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private competenciaAsignaturaService = inject(RAyRubricaService); // Inyecta el servicio

  asignaturaId: number | null = null;
  competenciaDestinoId: number | null = null; // Usaremos el ID numérico de la competencia destino

  // Lista de todos los RAs de la asignatura para filtrar y copiar
  ras: ResultadoAprendizajeAsignatura[] = [];
  rasFiltrados: ResultadoAprendizajeAsignatura[] = [];

  fechaFiltro: string = ''; // Para filtrar por fecha (opcional)

  // Para el modal de crear RA
  @ViewChild('addRaModalRef') addRaModalRef!: ElementRef;
  private addBsModal: any;
  nuevoRA: Partial<ResultadoAprendizajeAsignatura> = {}; // El nuevo RA a crear
  nuevaRADescripcion: string = ''; // Para la descripción en el modal

  // No se usa raEnEdicion ni mostrarModalCrear globalmente para este componente
  // (raEnEdicion se usa en GestionarRAporAsignaturaComponent para edición)

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const asignaturaIdStr = params.get('asignaturaId');
      const competenciaIdStr = params.get('competenciaId'); // Asegúrate que el parámetro de la ruta sea 'competenciaId'

      if (asignaturaIdStr && competenciaIdStr) {
        this.asignaturaId = +asignaturaIdStr;
        this.competenciaDestinoId = +competenciaIdStr; // Convertir a número

        console.log(`Cargando RA para Asignatura ID: ${this.asignaturaId}, Competencia Destino ID: ${this.competenciaDestinoId}`);
        this.cargarRAsExistentes();
      } else {
        console.error('IDs de asignatura o competencia destino no encontrados en la ruta.');
        alert('Error: No se pudo determinar la asignatura o competencia destino.');
        this.router.navigate(['/profesor']); // Redirigir a una página segura
      }
    });
  }

  ngAfterViewInit(): void {
    // Inicializa el modal de Bootstrap aquí
    this.addBsModal = new bootstrap.Modal(this.addRaModalRef.nativeElement);
  }

  cargarRAsExistentes(): void {
    if (this.asignaturaId === null) return;

    this.competenciaAsignaturaService.getSoloResultadosAprendizajeAsignatura(this.asignaturaId).subscribe({
      next: (data) => {
        this.ras = data;
        this.filtrarPorFecha(); // Aplicar el filtro inicial
        console.log('RAs existentes cargados para copiar/crear:', this.ras);
      },
      error: (err) => {
        console.error('Error al cargar RAs existentes:', err);
        alert('Error al cargar la lista de Resultados de Aprendizaje para copiar.');
      }
    });
  }

  filtrarPorFecha() {
    if (!this.fechaFiltro) {
      this.rasFiltrados = [...this.ras];
      return;
    }
    // Asegurarse de que 'fecha_creacion' exista y sea comparable
    this.rasFiltrados = this.ras.filter(ra =>
      ra.fecha_creacion && ra.fecha_creacion.substring(0, 10) >= this.fechaFiltro
    );
  }

  // --- Funcionalidad de Copiar RA ---
  copiarRA(ra: ResultadoAprendizajeAsignatura) {
    if (this.competenciaDestinoId === null || ra.id === undefined) {
      alert('Error: No se pudo copiar el RA. Falta el ID del RA o el ID de la competencia destino.');
      return;
    }

    if (confirm(`¿Estás seguro de copiar el RA "${ra.descripcion}" a la competencia actual?`)) {
      this.competenciaAsignaturaService.copiarRaACompetencia(ra.id, this.competenciaDestinoId).subscribe({
        next: (response) => {
          console.log('RA copiado exitosamente:', response);
          alert('RA copiado exitosamente a la competencia.');
          // Puedes decidir qué hacer después de copiar:
          // 1. Recargar los RAs de la competencia destino (si tu backend lo soporta con un GET específico)
          // 2. Redirigir a la vista de gestión de RAs para esa competencia:
          this.router.navigate(['/profesor/RAasignatura', this.asignaturaId]);
        },
        error: (err) => {
          console.error('Error al copiar RA:', err);
          alert('Error al copiar el Resultado de Aprendizaje. Verifica si ya existe o hay un problema en el servidor.');
        }
      });
    }
  }

  // --- Funcionalidad de Crear Nuevo RA ---
  prepararNuevoRA() {
    this.nuevaRADescripcion = ''; // Limpiar el campo de descripción
    this.addBsModal.show(); // Abrir modal
  }

  guardarNuevoRA() {
    if (this.competenciaDestinoId === null) {
      alert('Error: No se pudo crear el RA. El ID de la competencia destino no está disponible.');
      return;
    }
    if (!this.nuevaRADescripcion.trim()) {
      alert('La descripción del Resultado de Aprendizaje no puede estar vacía.');
      return;
    }

    const nuevoRAData = {
      competencia: this.competenciaDestinoId,
      descripcion: this.nuevaRADescripcion,
    };

    this.competenciaAsignaturaService.crearResultadoAprendizaje(nuevoRAData).subscribe({
      next: (response) => {
        console.log('Nuevo RA creado exitosamente:', response);
        alert('Resultado de Aprendizaje creado exitosamente.');
        this.addBsModal.hide(); // Cerrar modal
        this.router.navigate(['/profesor/RAasignatura', this.asignaturaId]); // Redirigir al listado
      },
      error: (err) => {
        console.error('Error al crear nuevo RA:', err);
        alert('Error al crear el nuevo Resultado de Aprendizaje. ' + JSON.stringify(err.error));
      }
    });
  }

  cerrarModalCrear() {
    this.addBsModal.hide();
  }

  // --- Funcionalidad de Eliminar RA (no es desvincular, es eliminar) ---
  eliminarRA(ra: ResultadoAprendizajeAsignatura) {
    if (ra.id === undefined) {
      alert('Error: El RA no tiene ID para eliminar.');
      return;
    }

    const confirmacion = confirm('Si eliminas este RA se borrará permanentemente. ¿Deseas continuar?');
    if (confirmacion) {
      this.competenciaAsignaturaService.eliminarResultadoAprendizaje(ra.id).subscribe({
        next: () => {
          alert('RA eliminado exitosamente.');
          // Actualizar la lista localmente
          this.ras = this.ras.filter(r => r.id !== ra.id);
          this.filtrarPorFecha();
        },
        error: (err) => {
          console.error('Error al eliminar RA:', err);
          alert('Error al eliminar el Resultado de Aprendizaje.');
        }
      });
    }
  }

  // --- Funcionalidad de Editar RA (Mantener redirección simple) ---
  editarRA(ra: ResultadoAprendizajeAsignatura) {
    alert(`Redirigiendo para editar RA: ${ra.descripcion}`);
    // Aquí puedes redirigir a tu componente de edición de RA
    this.router.navigate(['/profesor/editarRA', ra.id]); // Asume una ruta como 'profesor/editarRA/:id'
  }
}