// src/app/modelos/resultado-aprendizaje.ts
export interface ResultadoAprendizaje {
  id?: number; // Opcional al crear, presente al listar/editar
  competencia?: number; // ID de la competencia a la que pertenece. Se usará al crear.
  descripcion: string;
  activo?: boolean; // Campo para "desvincular" si el backend lo usa para marcar inactivo
  fecha_creacion?: string; // Considera usar 'Date' si lo parseas
}