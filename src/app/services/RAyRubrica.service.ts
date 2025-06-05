// src/app/services/competencia-asignatura.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetenciaAsignatura } from '../modelos/competencia-asignatura';
import { ResultadoAprendizajeAsignatura } from '../modelos/resultado-aprendizaje-asignatura';
import { Criterio, Rubrica } from '../modelos/rubrica';

@Injectable({
  providedIn: 'root',
})
export class RAyRubricaService {
  private http = inject(HttpClient);
  private apiUrlBase = 'http://localhost:8000/api';

  obtenerResultadosAprendizajePorCompetencia(
    competenciaId: number
  ): Observable<ResultadoAprendizajeAsignatura[]> {
    return this.http.get<ResultadoAprendizajeAsignatura[]>(
      `${this.apiUrlBase}/competencias-asignatura/solo-ra/${competenciaId}/`
    );
  }

  // Eliminar un RA
  eliminarResultadoAprendizaje(raId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrlBase}/competencias-asignatura/resultados-aprendizaje/eliminar/${raId}/`
    );
  }

  // Desvincular un RA de una competencia
  desvincularResultadoAprendizaje(raId: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrlBase}/competencias-asignatura/resultados-aprendizaje/desvincular/${raId}/`,
      {}
    );
  }

  // Editar un RA
  editarResultadoAprendizaje(
    raId: number,
    data: { descripcion: string; competencia?: number; activo?: boolean }
  ): Observable<ResultadoAprendizajeAsignatura> {
    return this.http.put<ResultadoAprendizajeAsignatura>(
      `${this.apiUrlBase}/competencias-asignatura/resultados-aprendizaje/editar/${raId}/`,
      data
    );
  }

  // Obtener solo competencias por id_asignatura
  getSoloCompetenciasAsignatura(
    idAsignatura: number
  ): Observable<CompetenciaAsignatura[]> {
    return this.http.get<CompetenciaAsignatura[]>(
      `${this.apiUrlBase}/competencias-asignatura/solo-competencias/${idAsignatura}/`
    );
  }

  // Obtener solo RAs por id_asignatura
  getSoloResultadosAprendizajeAsignatura(
    idAsignatura: number
  ): Observable<ResultadoAprendizajeAsignatura[]> {
    return this.http.get<ResultadoAprendizajeAsignatura[]>(
      `${this.apiUrlBase}/competencias-asignatura/solo-ra/${idAsignatura}/`
    );
  }

  // Obtener competencias y RAs completos por id_asignatura (este es el más útil para tu vista)
  getCompetenciasAsignaturaCompleto(
    idAsignatura: number
  ): Observable<CompetenciaAsignatura[]> {
    return this.http.get<CompetenciaAsignatura[]>(
      `${this.apiUrlBase}/competencias-asignatura/completo/${idAsignatura}/`
    );
  }

  // Crear una rúbrica
  crearRubrica(rubrica: {
    nombre: string;
    descripcion?: string;
    resultado_aprendizaje?: number;
  }): Observable<Rubrica> {
    return this.http.post<Rubrica>(
      `${this.apiUrlBase}/rubricas/crear/`,
      rubrica
    );
  }

  // Asociar una rúbrica existente a un RA
  vincularRubricaARa(
    rubricaId: number,
    resultadoAprendizajeId: number
  ): Observable<Rubrica> {
    return this.http.patch<Rubrica>(
      `${this.apiUrlBase}/rubricas/vincular-a-ra/${rubricaId}/`,
      {
        resultado_aprendizaje_id: resultadoAprendizajeId,
      }
    );
  }

  // Listar todas las rúbricas
  listarRubricas(): Observable<Rubrica[]> {
    return this.http.get<Rubrica[]>(`${this.apiUrlBase}/rubricas/listar/`);
  }

  // Obtener una rúbrica por ID (con sus criterios)
  obtenerRubricaPorId(id: number): Observable<Rubrica> {
    return this.http.get<Rubrica>(`${this.apiUrlBase}/rubricas/obtener/${id}/`);
  }

  // Editar una rúbrica
  editarRubrica(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      resultado_aprendizaje?: number;
    }
  ): Observable<Rubrica> {
    return this.http.put<Rubrica>(
      `${this.apiUrlBase}/rubricas/actualizar/${id}/`,
      data
    );
  }

  // Eliminar una rúbrica
  eliminarRubrica(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlBase}/rubricas/eliminar/${id}/`);
  }

  // Listar criterios por rúbrica
  listarCriteriosPorRubrica(rubricaId: number): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(
      `${this.apiUrlBase}/rubricas/criterios/por-rubrica/${rubricaId}/`
    );
  }

  /**
   * Crea un nuevo Resultado de Aprendizaje.
   * @param ra Los datos del RA a crear (ID de competencia y descripción).
   * @returns Un Observable con el ResultadoAprendizajeAsignatura creado.
   */
  crearResultadoAprendizaje(ra: {
    competencia: number;
    descripcion: string;
  }): Observable<ResultadoAprendizajeAsignatura> {
    const url = `${this.apiUrlBase}/competencias-asignatura/resultados-aprendizaje/crear/`;
    console.log('Enviando RA a backend:', ra);
    return this.http.post<ResultadoAprendizajeAsignatura>(url, ra);
  }

  /**
   * Copia un RA existente a una nueva competencia.
   * @param oldRaId El ID del RA a copiar.
   * @param newCompetenciaId El ID de la competencia de asignatura destino.
   * @returns Un Observable con la respuesta del backend (probablemente el nuevo RA copiado).
   */
  copiarRaACompetencia(
    oldRaId: number,
    newCompetenciaId: number
  ): Observable<ResultadoAprendizajeAsignatura> {
    const url = `${this.apiUrlBase}/competencias-asignatura/copiar-ra/${oldRaId}/a/${newCompetenciaId}/`;

    console.log(
      'Solicitando copiar RA con ID',
      oldRaId,
      'a competencia',
      newCompetenciaId,
      'a URL:',
      url
    );
    return this.http.post<ResultadoAprendizajeAsignatura>(url, {}); // Envía un cuerpo vacío si no se necesita nada específico
  }

  /**
   * Vincula una rúbrica existente a un Resultado de Aprendizaje.
   * @param raId El ID del Resultado de Aprendizaje al que se vinculará la rúbrica.
   * @param rubricaId El ID de la rúbrica a vincular.
   * @returns Un Observable con la respuesta del backend (normalmente el RA actualizado).
   */
  vincularRubricaAResultadoAprendizaje(
    raId: number,
    rubricaId: number
  ): Observable<ResultadoAprendizajeAsignatura> {
    const url = `${this.apiUrlBase}/rubricas/resultados-aprendizaje/vincular-rubrica/${raId}/`;
    const payload = { rubrica: rubricaId };
    console.log(
      `Solicitando vincular rúbrica ID ${rubricaId} a RA ID ${raId} en URL: ${url} con payload:`,
      payload
    );
    return this.http.patch<ResultadoAprendizajeAsignatura>(url, payload);
  }
}
