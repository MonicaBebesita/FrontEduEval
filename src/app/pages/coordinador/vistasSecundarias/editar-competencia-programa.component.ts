import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-editar-competencia-programa',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Editar Competencia</h2>
      <form (ngSubmit)="guardarCambios()">
        <div class="mb-3">
          <label class="form-label">Nombre Competencia</label>
          <input
            type="text"
            class="form-control"
            [(ngModel)]="competencia.nombre"
            name="nombre"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Descripción Competencia</label>
          <textarea
            class="form-control"
            [(ngModel)]="competencia.descripcion"
            name="descripcion"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Nivel</label>
          <select
            class="form-select"
            [(ngModel)]="competencia.nivel"
            name="nivel"
            required
          >
            <option value="básico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        <button type="submit" class="btn btn-success">Guardar Cambios</button>
        <button type="button" class="btn btn-secondary ms-2" (click)="cancelar()">Cancelar</button>
      </form>
    </div>
  `
})
export class EditarCompetenciaProgramaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  competencia = {
    id: 0,
    nombre: '',
    descripcion: '',
    nivel: 'básico',
  };

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    
    const todas = [
      { id: 1, nombre: 'Resolver problemas', descripcion: 'Habilidad para resolver problemas complejos', nivel: 'avanzado' },
      { id: 2, nombre: 'Pensamiento crítico', descripcion: 'Analizar y evaluar argumentos', nivel: 'básico' },
    ];

    const encontrada = todas.find((c) => c.id === id);
    if (encontrada) {
      this.competencia = { ...encontrada };
    } else {
      console.error('Competencia no encontrada');
    }
  }

  guardarCambios() {
    console.log('Competencia actualizada:', this.competencia);
    // Aquí puedes hacer una petición HTTP PUT o PATCH
    this.router.navigate(['/programa']); // o a donde quieras redirigir
  }

  cancelar() {
    this.router.navigate(['/programa']);
  }
}
