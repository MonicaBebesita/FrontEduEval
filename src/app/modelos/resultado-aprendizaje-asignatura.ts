import { Rubrica } from "./rubrica";

export interface ResultadoAprendizajeAsignatura {
  id?: number; 
  competencia?: number; 
  descripcion: string;
  activo?: boolean;
  fecha_creacion?: string; 
  rubrica?: Rubrica; 
}