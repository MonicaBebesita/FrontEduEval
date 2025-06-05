import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-editar-competencia-asignatura',
  imports: [CommonModule, FormsModule],
  templateUrl:'./editar-competencia-asignatura.component.html' 
  
})
export class EditarCompetenciaAsignaturaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  competencia = {
    id: 0,
    nombre: '',
    descripcion: '',
    nivel: 'básico',
    vinculadas: [] as number[],
  };

  competenciasPrograma = [
    { id: 10, nombre: 'Comunicación efectiva' },
    { id: 11, nombre: 'Pensamiento crítico' },
    { id: 12, nombre: 'Trabajo en equipo' },
  ];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const todas = [
      {
        id: 1,
        nombre: 'Resolver problemas',
        descripcion: 'Habilidad para resolver problemas complejos',
        nivel: 'avanzado',
        vinculadas: [10, 12],
      },
      {
        id: 2,
        nombre: 'Pensamiento crítico',
        descripcion: 'Analizar y evaluar argumentos',
        nivel: 'básico',
        vinculadas: [],
      },
    ];

    const encontrada = todas.find((c) => c.id === id);
    if (encontrada) {
      this.competencia = { ...encontrada };
    } else {
      console.error('Competencia no encontrada');
    }
  }

  onCheckboxChange(event: Event, id: number) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.competencia.vinculadas.includes(id)) {
        this.competencia.vinculadas.push(id);
      }
    } else {
      this.competencia.vinculadas = this.competencia.vinculadas.filter((i) => i !== id);
    }
  }

  guardarCambios() {
    console.log('Competencia actualizada:', this.competencia);
    this.router.navigate(['/programa']);
  }

  cancelar() {
    this.router.navigate(['/programa']);
  }
}
