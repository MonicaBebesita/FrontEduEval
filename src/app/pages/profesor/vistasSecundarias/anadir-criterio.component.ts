// src/app/pages/profesor/vistasSecundarias/anadir-criterio.component.ts
import { Component, OnInit, inject } from '@angular/core'; // Importa OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Importa ActivatedRoute y Router
import { CriterioService } from '../../../services/criterio.service'; // Importa el nuevo servicio
import { Criterio } from '../../../modelos/rubrica'; // Asegúrate de que el modelo Criterio esté correcto

@Component({
  selector: 'app-anadir-criterio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './anadir-Criterio.component.html',
  styleUrls: ['./anadir-Criterio.component.css'],
})
export class AnadirCriterioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Para la navegación después de guardar
  private criterioService = inject(CriterioService); // Inyecta el nuevo servicio

  rubricaId: number | null = null; // Para almacenar el ID de la rúbrica de la ruta

  // Ajustado el modelo para que coincida con el payload del backend (un solo criterio)
  criterio: {
    descripcion: string;
    ponderado: number;
    nivel: number;
  } = {
    descripcion: '',
    ponderado: 0,
    nivel: 1, // Valor por defecto, puedes ajustarlo o hacerlo seleccionable
  };

  // Puedes definir opciones para el nivel si quieres un select en el HTML
  nivelesOpciones = [
    { value: 1, label: 'Básico' },
    { value: 2, label: 'Medio' },
    { value: 3, label: 'Avanzado' },
  ];

  ngOnInit() {
    // Obtener el rubricaId de la ruta
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.rubricaId = +id; // Convierte el string a número
        console.log('ID de rúbrica obtenido de la ruta:', this.rubricaId);
      } else {
        console.error('No se encontró el ID de la rúbrica en la ruta.');
        alert('Error: No se encontró el ID de la rúbrica.');
        // Opcional: Redirigir si no hay ID
        this.router.navigate(['/profesor/rubricas']);
      }
    });
  }

  guardar() {
    if (this.rubricaId === null) {
      alert('Error: No se puede guardar el criterio sin el ID de la rúbrica.');
      return;
    }

    // Preparar el payload para el backend
    const criterioParaBackend = {
      descripcion: this.criterio.descripcion,
      ponderado: this.criterio.ponderado / 100, // Convertir a formato 0.0 - 1.0 si el usuario ingresa %
      nivel: this.criterio.nivel,
      rubrica: this.rubricaId, // Asignar el ID de la rúbrica
    };

    console.log('Enviando criterio:', criterioParaBackend);

    this.criterioService.crearCriterio(criterioParaBackend).subscribe({
      next: (response: Criterio) => {
        console.log('Criterio creado exitosamente:', response);
        alert('Criterio guardado correctamente.');
        // Opcional: Redirigir al usuario de vuelta a la vista de la rúbrica o RAs
        this.router.navigate(['/profesor/rubricas', this.rubricaId]); // Redirige a la página de rúbrica

        // Resetear el formulario
        this.criterio = {
          descripcion: '',
          ponderado: 0,
          nivel: 1,
        };
      },
      error: (error) => {
        console.error('Error al guardar el criterio:', error);
        alert(
          'Error al guardar el criterio: ' +
            (error.error?.detail || error.message)
        );
      },
    });
  }
}
