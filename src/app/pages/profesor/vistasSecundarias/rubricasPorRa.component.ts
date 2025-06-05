import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rubricas-por-ra',
  imports: [CommonModule, FormsModule],
  templateUrl: './rubricasPorRa.component.html'
})
export class RubricasPorRaComponent {
  rubricas = [
    {
      nombre: 'Comprensión de conceptos',
      expandido: false,
      criterios: [
        {
          nombre: 'Claridad conceptual',
          ponderacion: 30,
          niveles: [
            { nivel: 'Alto', descripcion: 'Demuestra comprensión profunda', nota: 5 },
            { nivel: 'Medio', descripcion: 'Comprende parcialmente', nota: 3 },
            { nivel: 'Bajo', descripcion: 'No demuestra comprensión', nota: 1 }
          ]
        }
      ]
    },
    {
      nombre: 'Resolución de problemas',
      expandido: false,
      criterios: []
    }
  ];

  agregarRubrica() {
    // Lógica de navegación o modal
    alert('Agregar nueva rúbrica');
  }

  editarRubrica(rubrica: any) {
    alert(`Editar rúbrica: ${rubrica.nombre}`);
  }

  eliminarRubrica(rubrica: any) {
    if (confirm(`¿Eliminar rúbrica "${rubrica.nombre}"?`)) {
      this.rubricas = this.rubricas.filter(r => r !== rubrica);
    }
  }

  agregarCriterio(rubrica: any) {
    alert(`Agregar criterio a: ${rubrica.nombre}`);
  }

  editarCriterio(criterio: any) {
    alert(`Editar criterio: ${criterio.nombre}`);
  }


  eliminarCriterio(rubrica: any, criterio: any) {
    if (confirm(`¿Eliminar criterio "${criterio.nombre}"?`)) {
      rubrica.criterios = rubrica.criterios.filter((c: any) => c !== criterio);
    }
  }
}
