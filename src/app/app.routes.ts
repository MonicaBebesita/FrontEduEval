import { Routes } from '@angular/router';
import { GestionarRubricasComponent } from './pages/profesor/vistasPrincipales/gestionar-rubricas.component';
import { GestionarCompetenciasProgramaComponent } from './pages/coordinador/vistasPrincipales/gestionar-competencias-programa.component';
import { ProgramaRaComponent } from './pages/coordinador/vistasPrincipales/gestionar-RA-programa.component';
import { CompetenciasAsignaturaComponentdePrograma } from './pages/coordinador/vistasPrincipales/competencias-asignatura.component';
import { RaProgramaComponent } from './pages/coordinador/vistasSecundarias/ver-RA-CP.component';
import { CrearCompetenciaProgramaComponent } from './pages/coordinador/vistasSecundarias/crear-competencia-programa.component';
import { CrearCompetenciaAsignaturaComponent } from './pages/coordinador/vistasSecundarias/crear-competencia-asignatura.component';
import { VerCompetenciaProgramaComponent } from './pages/coordinador/vistasSecundarias/ver-competencia-programa.component';
import { VerCompetenciaAsignaturaComponent } from './pages/coordinador/vistasSecundarias/ver-competencia-asignatura.component';
import { EditarCompetenciaProgramaComponent } from './pages/coordinador/vistasSecundarias/editar-competencia-programa.component';
import { EditarCompetenciaAsignaturaComponent } from './pages/coordinador/vistasSecundarias/editar-competencia-asignatura.component';
import { AgregarRaComponent } from './pages/profesor/vistasSecundarias/agregar-ra.component';
import { AsignaturasCAPage } from './pages/coordinador/vistasPrincipales/asignaturasCA.component';
import { AsignaturasRUBPage } from './pages/profesor/vistasPrincipales/asignaturasRUB.component';

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
        component: AsignaturasCAPage,
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
    path: 'profesor',
    children: [
      {
        path: '',
        component: AsignaturasRUBPage, // muestra las tarjetas
      },
      {
        path: 'RAasignatura/:id', // cuando haces clic en una asignatura
        component: GestionarRubricasComponent,
      },
      {
        path: 'agragarRA/:id',
        component: AgregarRaComponent,
      },
    ],
  },

  {
    path: '',
    redirectTo: '/profesor',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/profesor',
  },
];
