import { Routes } from '@angular/router';
import { GestionarCompetenciasProgramaComponent } from './pages/programa/gestionar-competencias/gestionar-competencias-programa.component';
import { GestionarCompetenciasAsignaturaComponent } from './pages/programa/gestionar-competencias/gestionar-competencias-asignatura.component';

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
          import(
            './pages/programa/crear-competencia/crear-competencia.component'
          ).then((m) => m.CrearCompetenciaComponent),
      },
    ],
  },
  {
    path: 'asignatura',
    children: [
      {
        path: '',
        component: GestionarCompetenciasAsignaturaComponent,
      },
      /*
      {
        path: 'crear',
        loadComponent: () =>
          import(
            './pages/asignatura/crear-competencia-asignatura/crear-competencia-asignatura.component'
          ).then((m) => m.CrearCompetenciaAsignaturaComponent),
      },
      */
    ],
  },
  {
    path: '',
    redirectTo: '/programa',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/programa',
  },
];
