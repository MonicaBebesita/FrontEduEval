export interface ResultadoAprendizaje {
  descripcion: string;
}

export interface CompetenciaPrograma {
  id_programa: number;
  descripcion: string;
  nivel: number;
  resultados_aprendizaje?: ResultadoAprendizaje[]; // Opcional si no siempre se envían con la creación
}