import { Routes } from '@angular/router';
import { GestionarCompetenciasComponent } from './pages/programa/gestionar-competencias/gestionar-competencias.component';

export const routes: Routes = [
  {
    path: 'programa',
    children: [
      {
        path: '',
        component: GestionarCompetenciasComponent
      },
      {
        path: 'crear',
        loadComponent: () =>
          import('./pages/programa/crear-competencia/crear-competencia.component').then(m => m.CrearCompetenciaComponent)
      },
     
    ]
  },
  {
    path: '',
    redirectTo: '/programa',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/programa'
  }
];
