import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-gestionar-ra-asignatura',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestionar-ra-asignatura.component.html',
  styleUrl: './gestionar-ra-asignatura.component.css',
})
export class GestionarRAporAsignaturaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  asignaturaId = '';
  mostrarModalCrear = false;
  raEnEdicion: any = null;
  raParaNuevaRubrica: any = null;
  nuevoNombreRubrica: string = '';
  rubricaEnEdicion: { ra: any; nombre: string } | null = null;


  competenciasAsignatura = ['Resolver ecuaciones ', 'Analizar funciones'];

  raAgrupados: {
    competencia: string;
    expandido: boolean;
    ras: any[]; // Incluye info de rúbricas también
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
            expandido: false,
            rubrica: null, // o un objeto si ya existe
          },
          {
            id: 2,
            descripcion:
              'Resuelve sistemas de ecuaciones usando métodos gráficos y algebraicos.',
            fecha: '2024-02-03',
            competencia: 'Resolver ecuaciones',
            expandido: false,
            rubrica: null,
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
            expandido: false,
            rubrica: {
              nombre: 'Comprensión de conceptos',
              expandido: false,
              criterios: [
                {
                  nombre: 'Claridad conceptual',
                  ponderacion: 30,
                  niveles: [
                    {
                      nivel: 'Alto',
                      descripcion: 'Demuestra comprensión profunda',
                      nota: 5,
                    },
                    {
                      nivel: 'Medio',
                      descripcion: 'Comprende parcialmente',
                      nota: 3,
                    },
                    {
                      nivel: 'Bajo',
                      descripcion: 'No demuestra comprensión',
                      nota: 1,
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ].map((grupo) => ({ ...grupo, expandido: false }));
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
      expandido: false,
      rubrica: null,
    };

    const grupo = this.raAgrupados.find(
      (g) => g.competencia === nuevo.competencia
    );
    if (grupo) {
      grupo.ras.push(nuevo);
    } else {
      this.raAgrupados.push({
        competencia: nuevo.competencia,
        expandido: false,
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

    const originalGrupo = this.raAgrupados.find((g) =>
      g.ras.some((r) => r.id === this.raEnEdicion.id)
    );
    if (
      originalGrupo &&
      originalGrupo.competencia !== this.raEnEdicion.competencia
    ) {
      originalGrupo.ras = originalGrupo.ras.filter(
        (r) => r.id !== this.raEnEdicion.id
      );

      let nuevoGrupo = this.raAgrupados.find(
        (g) => g.competencia === this.raEnEdicion.competencia
      );
      if (!nuevoGrupo) {
        nuevoGrupo = {
          competencia: this.raEnEdicion.competencia,
          expandido: false,
          ras: [],
        };
        this.raAgrupados.push(nuevoGrupo);
      }
      nuevoGrupo.ras.push(this.raEnEdicion);
    }

    this.raEnEdicion = null;
  }

  cerrarModalEditar() {
    this.raEnEdicion = null;
  }

  crearRubrica(ra: any) {
    ra.rubrica = {
      nombre: 'Nueva Rúbrica',
      expandido: false,
      criterios: [],
    };
  }

  toggleRA(ra: any) {
    ra.expandido = !ra.expandido;
  }

  toggleRubrica(rubrica: any) {
    rubrica.expandido = !rubrica.expandido;
  }

  eliminarRubrica(ra: any) {
    if (confirm(`¿Eliminar la rúbrica de "${ra.descripcion}"?`)) {
      ra.rubrica = null;
    }
  }

  agregarCriterio(rubrica: any) {
    alert(`Agregar criterio a: ${rubrica.nombre}`);
  }

editarRubrica(ra: any) {
  this.rubricaEnEdicion = {
    ra,
    nombre: ra.rubrica.nombre
  };
}
guardarEdicionRubrica() {
  if (this.rubricaEnEdicion) {
    this.rubricaEnEdicion.ra.rubrica.nombre = this.rubricaEnEdicion.nombre;
    this.rubricaEnEdicion = null;
  }
}

cerrarModalEditarRubrica() {
  this.rubricaEnEdicion = null;
}


  editarCriterio(criterio: any) {
    alert(`Editar criterio: ${criterio.nombre}`);
  }

  eliminarCriterio(rubrica: any, criterio: any) {
    if (confirm(`¿Eliminar criterio "${criterio.nombre}"?`)) {
      rubrica.criterios = rubrica.criterios.filter((c: any) => c !== criterio);
    }
  }

  confirmarCrearRubrica() {
    if (this.raParaNuevaRubrica && this.nuevoNombreRubrica.trim()) {
      this.raParaNuevaRubrica.rubrica = {
        nombre: this.nuevoNombreRubrica,
        expandido: false,
        criterios: [],
      };
    }
    this.nuevoNombreRubrica = '';
    this.raParaNuevaRubrica = null;
  }

  cancelarCrearRubrica() {
    this.raParaNuevaRubrica = null;
    this.nuevoNombreRubrica = '';
  }
}
