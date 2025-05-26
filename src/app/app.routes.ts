import { Routes } from '@angular/router';
import { GestionarCompetenciasAsignaturaComponent } from './pages/asignatura/gestionar-competencias-asignatura.component';
import { AsignaturasPageComponentCA } from './pages/asignatura/asignaturas.componentCA';
import { AsignaturasPageComponentRUB } from './pages/profesor/asignaturas.componentRUB';
import { GestionarRubricasComponent } from './pages/profesor/gestionar-rubricas.component';
import { GestionarCompetenciasProgramaComponent } from './pages/coordinador/vistasPrincipales/gestionar-competencias-programa.component';
import { ProgramaRaComponent } from './pages/coordinador/vistasPrincipales/gestionar-RA-programa.component';
import { AsignaturasComponentCAdePrograma } from './pages/coordinador/vistasPrincipales/asignaturas.componentCA';
import { CompetenciasAsignaturaComponentdePrograma } from './pages/coordinador/vistasPrincipales/competencias-asignatura.component';
import { RaProgramaComponent } from './pages/coordinador/vistasSecundarias/ver-RA-CP.component';
import { CrearCompetenciaProgramaComponent } from './pages/coordinador/vistasSecundarias/crear-competencia-programa.component';
import { CrearCompetenciaAsignaturaComponent } from './pages/coordinador/vistasSecundarias/crear-competencia-asignatura.component';
import { VerCompetenciaProgramaComponent } from './pages/coordinador/vistasSecundarias/ver-competencia-programa.component';
import { VerCompetenciaAsignaturaComponent } from './pages/coordinador/vistasSecundarias/ver-competencia-asignatura.component';
import { EditarCompetenciaProgramaComponent } from './pages/coordinador/vistasSecundarias/editar-competencia-programa.component';
import { EditarCompetenciaAsignaturaComponent } from './pages/coordinador/vistasSecundarias/editar-competencia-asignatura.component';

export const routes: Routes = [
  {
    path: 'programa',
    children: [
      {
        path: '',
        component: GestionarCompetenciasProgramaComponent,
      },

      {
        path: 'CAasignaturas',
        component: AsignaturasComponentCAdePrograma,
      },
      {
        path: 'CA/:id',
        component: CompetenciasAsignaturaComponentdePrograma,
      },
      {
        path: 'RAprograma/:id',
        component: ProgramaRaComponent,
      },
      {
        path: 'crearCP',

        component: CrearCompetenciaProgramaComponent,
      },
      {
        path: 'crearCA',

        component: CrearCompetenciaAsignaturaComponent,
      },
      {
        path: 'verCP/:id',

        component: VerCompetenciaProgramaComponent,
      },
       {
        path: 'verCA/:id',

        component: VerCompetenciaAsignaturaComponent,
      },
      {
        path: 'editarCP/:id',

        component: EditarCompetenciaProgramaComponent,
      },
           {
        path: 'editarCA/:id',

        component: EditarCompetenciaAsignaturaComponent,
      },
      {
        path: 'RAasignatura/:id',
        loadComponent: () =>
          import(
            './pages/coordinador/vistasSecundarias/ver-RA-CA.component'
          ).then((m) => m.ListaRaPageComponent),
      },
      {
        path: 'RAprograma/:id',

        component: RaProgramaComponent,
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
