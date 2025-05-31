import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



interface RA {
  id: number;
  descripcion: string;
  fecha: string; // ISO date
  competencia: string;
  
}

@Component({
  standalone: true,
  selector: 'app-agregar-ra',
  templateUrl: './agregar-ra.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AgregarRaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  asignaturaId = '';
  competenciaDestino = '';

  ras: RA[] = [];
  rasFiltrados: RA[] = [];
  fechaFiltro: string = '';
  nuevoRA: Partial<RA> = {};
   mostrarModalCrear = false;

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('asignaturaId') || '';
    this.competenciaDestino = this.route.snapshot.paramMap.get('competencia') || '';

    // Simulación de datos. Reemplazar con servicio real.
    this.ras = [
      {
        id: 1,
        descripcion: 'Desarrolla soluciones utilizando patrones de diseño',
        fecha: '2024-01-15',
        competencia: 'Competencia 1'
      },
      {
        id: 2,
        descripcion: 'Comprende y aplica principios de arquitectura de software',
        fecha: '2024-03-10',
        competencia: 'Competencia 2'
      }
    ];

    this.rasFiltrados = [...this.ras];
  }

  filtrarPorFecha() {
    if (!this.fechaFiltro) {
      this.rasFiltrados = [...this.ras];
      return;
    }

    this.rasFiltrados = this.ras.filter(ra => ra.fecha >= this.fechaFiltro);
  }

  copiarRA(ra: RA) {
    alert(`RA copiado a la competencia "${this.competenciaDestino}":\n\n${ra.descripcion}`);
    // Lógica de copia real aquí...
  }

  editarRA(ra: RA) {
    alert(`Editar RA: ${ra.descripcion}`);
    // Redirigir o abrir modal, según tu flujo
  }

  eliminarRA(ra: RA) {
    const confirmacion = confirm('Si eliminas este RA no podrás reutilizarlo en el futuro. ¿Deseas continuar?');
    if (confirmacion) {
      this.ras = this.ras.filter(r => r.id !== ra.id);
      this.filtrarPorFecha();
    }
  }
 prepararNuevoRA() {
    this.nuevoRA = {
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      competencia: this.competenciaDestino
    };
    this.mostrarModalCrear = true; // abrir modal
  }

  guardarNuevoRA() {
    if (!this.nuevoRA.descripcion?.trim()) return;

    const nuevo: RA = {
      id: this.ras.length + 1,
      descripcion: this.nuevoRA.descripcion!,
      fecha: this.nuevoRA.fecha!,
      competencia: this.nuevoRA.competencia!
    };

    this.ras.push(nuevo);
    this.filtrarPorFecha();

 
    this.mostrarModalCrear = false;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }
}
