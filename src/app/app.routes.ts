import { Routes } from '@angular/router';
import { GestionarCompetenciasProgramaComponent } from './pages/programa/gestionar-competencias-programa.component';
import { GestionarCompetenciasAsignaturaComponent } from './pages/asignatura/gestionar-competencias-asignatura.component';
import { AsignaturasPageComponentCA } from './pages/asignatura/asignaturas.componentCA';
import { AsignaturasPageComponentRUB } from './pages/asignatura/asignaturas.componentRUB';
import { GestionarRubricasComponent } from './pages/asignatura/rubrica/gestionar-rubricas/gestionar-rubricas.component';

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
    children: [
      {
        path: '',
        component: AsignaturasPageComponentCA, // muestra las tarjetas
      },
      {
        path: ':id', // cuando haces clic en una asignatura
        component: GestionarCompetenciasAsignaturaComponent,
      },
      {
        path: 'ra/:id',
        loadComponent: () =>
          import('./pages/asignatura/agregar-ra.component').then(
            (m) => m.AgregarRaComponent
          ),
      },
    ],
  },

{
    path: 'rubrica',
    children: [
      {
        path: '',
        component: AsignaturasPageComponentRUB, // muestra las tarjetas
      },
      {
        path: ':id', // cuando haces clic en una asignatura
        component: GestionarRubricasComponent,
      },
      {
        path: 'ra/:id',
        loadComponent: () =>
          import('./pages/asignatura/agregar-ra.component').then(
            (m) => m.AgregarRaComponent
          ),
      },
    ],
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
