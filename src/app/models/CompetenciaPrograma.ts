export interface CompetenciaPrograma {
  id: number;
  descripcion: string;
  id_programa: number;
  nivel: 1 | 2 | 3; // 1: Básico, 2: Medio, 3: Avanzado
}
