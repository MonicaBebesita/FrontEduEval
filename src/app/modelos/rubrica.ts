
export interface Rubrica {
  id?: number; // Autogenerado por Django
  nombre: string;
  descripcion?: string;
  resultado_aprendizaje?: number; // ID del ResultadoAprendizajeAsignatura al que está vinculada
  criterios?: Criterio[]; // Opcional, para cuando se obtiene una rúbrica completa
}


export interface NivelDesempeno {
  nivel: number; // 1, 2, 3
  descripcion: string;
  // Podrías añadir 'nota' si es parte del modelo de Django para NivelDesempeno
}


export interface Criterio {
  id?: number; // Autogenerado por Django
  rubrica?: number; // ID de la Rubrica a la que pertenece
  descripcion: string;
  ponderado: number; // float (0.0 a 1.0)
  nivel: 1 | 2 | 3; // 1 = Básico, 2 = Medio, 3 = Avanzado
  niveles?: NivelDesempeno[]; // Si quieres los niveles de desempeño aquí
}