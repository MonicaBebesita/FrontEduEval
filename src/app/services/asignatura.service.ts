// src/app/services/competencia-asignatura.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetenciaAsignatura } from '../modelos/competencia-asignatura';
import { ResultadoAprendizajeAsignatura } from '../modelos/resultado-aprendizaje-asignatura'; // Asegúrate de que esta interfaz se use si es necesario

@Injectable({
  providedIn: 'root',
})
export class CompetenciaAsignaturaService {
  private http = inject(HttpClient);
  // Asegúrate de que esta URL base sea correcta, sin una barra final si la ruta de la API ya la tiene.
  // Pero para este caso, la dejaré así y las rutas de API se asegurarán de no duplicarla.
  private apiUrlBase = 'http://localhost:8000/api';

  /**
   * Crea una nueva Competencia de Asignatura en el backend.
   * @param competencia Los datos de la competencia a crear, incluyendo id_asignatura.
   * @returns Un Observable con la CompetenciaAsignatura creada.
   */
  crearCompetenciaAsignatura(competencia: {
    id_asignatura: number;
    descripcion: string;
    nivel: 1 | 2 | 3;
    resultados_aprendizaje?: { descripcion: string }[];
  }): Observable<CompetenciaAsignatura> {
    const url = `${this.apiUrlBase}/competencias-asignatura/crear/`;
    console.log(
      'Enviando datos para crear Competencia de Asignatura:',
      competencia
    );
    return this.http.post<CompetenciaAsignatura>(url, competencia);
  }

  /**
   * Obtiene una lista de todas las Competencias de Asignatura.
   * @returns Un Observable con un array de CompetenciaAsignatura.
   */
  listarCompetenciasAsignatura(): Observable<CompetenciaAsignatura[]> {
    const url = `${this.apiUrlBase}/competencias-asignatura/listar/`;
    console.log('Obteniendo lista de Competencias de Asignatura desde:', url);
    return this.http.get<CompetenciaAsignatura[]>(url);
  }

  /**
   * Elimina una Competencia de Asignatura por su ID.
   * @param id El ID de la competencia a eliminar.
   * @returns Un Observable que no emite ningún valor (vacío) si la eliminación es exitosa.
   */
  eliminarCompetenciaAsignatura(id: number): Observable<void> {
    // Usamos void porque DELETE típicamente no devuelve un cuerpo
    const url = `${this.apiUrlBase}/competencias-asignatura/eliminar/${id}/`;
    console.log(
      'Enviando solicitud para eliminar Competencia de Asignatura con ID:',
      id
    );
    return this.http.delete<void>(url);
  }
}
