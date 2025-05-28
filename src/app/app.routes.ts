import { Routes } from '@angular/router';
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
import { GestionarRAporAsignaturaComponent } from './pages/profesor/vistasPrincipales/gestionar-ra-asignatura.component';
import { RubricasPorRaComponent } from './pages/profesor/vistasSecundarias/rubricasPorRa.component';
import { VerEvaluacionesComponent } from './pages/profesor/vistasPrincipales/verEvaluaciones.component';
import { AsignaturasEvalPage } from './pages/profesor/vistasPrincipales/asignaturasEvalcomponent';
import { AnadirCriterioComponent } from './pages/profesor/vistasSecundarias/anadir-criterio.component';
import { EditarCriterioComponent } from './pages/profesor/vistasSecundarias/editar-criterio.component';
import { AnadirEvaluacionComponent } from './pages/profesor/vistasSecundarias/crear-evaluacion.component';

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
        component: AsignaturasRUBPage,
      },
      {
        path: 'RAasignatura/:id',
        component: GestionarRAporAsignaturaComponent,
      },
      {
        path: 'EvalAsignatura',
        component: AsignaturasEvalPage,
      },

      {
        path: 'VerEvaluaciones/:id',
        component: VerEvaluacionesComponent,
      },
      {
        path: 'rubricas/:id',
        component: RubricasPorRaComponent,
      },
      {
        path: 'agragarRA/:id',
        component: AgregarRaComponent,
      },
      {
        path: 'agregarCriterio/:id',
        component: AnadirCriterioComponent,
      },
      {
        path: 'editarCriterio/:id',
        component: EditarCriterioComponent,
      },
      {
        path: 'crearEvaluacion/:id',
        component: AnadirEvaluacionComponent,
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
