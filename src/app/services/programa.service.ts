// src/app/services/competencia-programa.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoAprendizaje } from '../modelos/resultado-aprendizaje';
import { CompetenciaPrograma } from '../modelos/competencia-programa';

@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/competencias-programa';

  /**
   * Crea una nueva competencia de programa en el backend.
   * @param competencia Los datos de la competencia a crear.
   * @returns Un Observable con la respuesta del backend.
   */
  crearCompetenciaPrograma(
    competencia: CompetenciaPrograma
  ): Observable<CompetenciaPrograma> {
    const url = `${this.baseUrl}/crear/`; // Asegúrate de que esta sea la URL correcta para crear
    console.log('Enviando competencia a backend:', competencia);
    return this.http.post<CompetenciaPrograma>(url, competencia);
  }

  /**
   * Lista todas las competencias de programa desde el backend.
   * @returns Un Observable con un array de CompetenciaPrograma.
   */
  listarCompetenciasPrograma(): Observable<CompetenciaPrograma[]> {
    const url = `${this.baseUrl}/listar/`; // La URL del GET
    console.log('Solicitando listado de competencias de programa a:', url);
    return this.http.get<CompetenciaPrograma[]>(url);
  }

  /**
   * Elimina una competencia de programa específica del backend.
   * @param id El ID de la competencia a eliminar.
   * @returns Un Observable con la respuesta del backend (normalmente vacío o un mensaje de éxito).
   */
  eliminarCompetenciaPrograma(id: number): Observable<any> {
    const url = `${this.baseUrl}/eliminar/${id}/`; // Construye la URL con el ID
    console.log(
      'Enviando solicitud DELETE para competencia con ID:',
      id,
      'a URL:',
      url
    );
    return this.http.delete(url); // Usa el método DELETE
  }


  // ---  Métodos para Resultados de Aprendizaje (RA) ---

  /**
   * Crea un nuevo Resultado de Aprendizaje.
   * @param ra Los datos del Resultado de Aprendizaje a crear.
   * @returns Un Observable con la respuesta del backend.
   */
  crearResultadoAprendizaje(ra: { competencia: number; descripcion: string }): Observable<ResultadoAprendizaje> {
    const url = `${this.baseUrl}/resultados-aprendizaje/crear/`;
    console.log('Enviando RA a backend:', ra);
    return this.http.post<ResultadoAprendizaje>(url, ra);
  }

  /**
   * Lista todos los Resultados de Aprendizaje.
   * @returns Un Observable con un array de ResultadoAprendizaje.
   */
  listarResultadosAprendizaje(): Observable<ResultadoAprendizaje[]> {
    const url = `${this.baseUrl}/resultados-aprendizaje/listar/`;
    console.log('Solicitando listado de RA a:', url);
    return this.http.get<ResultadoAprendizaje[]>(url);
  }

  /**
   * Edita un Resultado de Aprendizaje existente.
   * @param id El ID del RA a editar.
   * @param ra Los datos actualizados del RA (solo descripción).
   * @returns Un Observable con la respuesta del backend.
   */
  editarResultadoAprendizaje(id: number, ra: { descripcion: string }): Observable<ResultadoAprendizaje> {
    const url = `${this.baseUrl}/resultados-aprendizaje/editar/${id}/`;
    console.log('Enviando edición de RA a backend:', ra);
    return this.http.put<ResultadoAprendizaje>(url, ra); // O PATCH si tu backend usa PATCH para actualizaciones parciales
  }

   /**
   * Desvincula (marca como inactivo o remueve la relación) un Resultado de Aprendizaje.
   * @param id El ID del RA a desvincular.
   * @returns Un Observable con la respuesta del backend.
   */
  desvincularResultadoAprendizaje(id: number): Observable<any> {
    const url = `${this.baseUrl}/resultados-aprendizaje/desvincular/${id}/`;
  
    const desvincularPayload = { }; 

    console.log('Enviando solicitud PATCH para desvincular RA con ID:', id, 'a URL:', url, 'con payload:', desvincularPayload);
    return this.http.patch(url, desvincularPayload); 
  }
}
