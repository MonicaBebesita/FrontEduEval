import { RA } from "./RA";

export type NivelCompetencia = 'básico' | 'intermedio' | 'avanzado';

export interface Competencia {
  id: string;
  descripcion: string;
  nivel: NivelCompetencia;
  resultadosAprendizaje?: RA[];
}
