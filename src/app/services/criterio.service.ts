// src/app/services/criterio.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Criterio } from '../modelos/rubrica'; // Asegúrate de que Criterio esté definido en tu archivo de modelos

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  private http = inject(HttpClient);
  private apiUrlBase = 'http://localhost:8000/api'; // Ajusta esto a tu URL base

  /**
   * Crea un nuevo criterio en el backend.
   * @param criterioData Objeto con los datos del criterio a crear: { descripcion: string, ponderado: number, nivel: number, rubrica: number }
   * @returns Un Observable con el criterio creado.
   */
  crearCriterio(criterioData: { descripcion: string; ponderado: number; nivel: number; rubrica: number }): Observable<Criterio> {
    const url = `${this.apiUrlBase}/rubricas/criterios/agregar/`; // Tu endpoint POST
    console.log('Enviando datos para crear criterio:', criterioData, 'a URL:', url);
    return this.http.post<Criterio>(url, criterioData);
  }

  // Si en el futuro necesitas editar o eliminar criterios, los agregarías aquí:
  // editarCriterio(criterioId: number, data: any): Observable<Criterio> { ... }
  // eliminarCriterio(criterioId: number): Observable<any> { ... }
}