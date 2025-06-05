// src/app/modelos/competencia-asignatura.ts
import { ResultadoAprendizajeAsignatura } from './resultado-aprendizaje-asignatura';

export interface CompetenciaAsignatura {
  id?: number; // El ID de la competencia (autogenerado por Django)
  id_asignatura: number; // El ID de la asignatura a la que pertenece
  descripcion: string;
  nivel: 1 | 2 | 3; // 1 = Básico, 2 = Medio, 3 = Avanzado
  resultados_aprendizaje?: ResultadoAprendizajeAsignatura[]; // Opcional, puede venir al crear o al ver detalles
}