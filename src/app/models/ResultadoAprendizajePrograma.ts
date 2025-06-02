export interface ResultadoAprendizajePrograma {
  id: number;
  descripcion: string;
  activo: boolean;
  fecha_creacion: string; // formato ISO (ej. '2025-05-31T14:30:00Z')
  competencia: number;
}
