import { Routes } from '@angular/router';
import { GestionarCompetenciasProgramaComponent } from './pages/programa/gestionar-competencias-programa.component';
import { GestionarCompetenciasAsignaturaComponent } from './pages/asignatura/gestionar-competencias-asignatura.component';

export const routes: Routes = [
  {
    path: 'programa',
    children: [
      {
        path: '',
        component: GestionarCompetenciasProgramaComponent,
      },
      {
        path: 'crear',
        loadComponent: () =>
          import('./pages/programa/crear-competencia.component').then(
            (m) => m.CrearCompetenciaComponent
          ),
      },
    ],
  },
  {
    path: 'asignatura',
    component: GestionarCompetenciasAsignaturaComponent,
  },
  {
    path: 'asignatura/ra/:id',
    loadComponent: () =>
      import('./pages/asignatura/agregar-ra.component').then(
        (m) => m.AgregarRaComponent
      ),
  },
  {
    path: '',
    redirectTo: '/asignatura',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/asignatura',
  },
];
