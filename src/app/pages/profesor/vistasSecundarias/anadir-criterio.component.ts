import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-criterio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anadir-Criterio.component.html',
  styleUrls: ['./anadir-Criterio.component.css']
})
export class AnadirCriterioComponent {
  criterio = {
    nombre: '',
    ponderacion: 0,
    niveles: {
      alto: { descripcion: '', nota: 0 },
      medio: { descripcion: '', nota: 0 },
      bajo: { descripcion: '', nota: 0 }
    }
  };

  guardar() {
    // Aquí emitirías o enviarías el criterio donde se necesite
    console.log('Criterio creado:', this.criterio);
    alert('Criterio guardado correctamente.');
    // Reset si es necesario
    this.criterio = {
      nombre: '',
      ponderacion: 0,
      niveles: {
        alto: { descripcion: '', nota: 0 },
        medio: { descripcion: '', nota: 0 },
        bajo: { descripcion: '', nota: 0 }
      }
    };
  }
}
