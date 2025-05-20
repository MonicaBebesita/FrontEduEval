import { Routes } from '@angular/router';
import { GestionarCompetenciasComponent } from './pages/programa/gestionar-competencias/gestionar-competencias.component';

export const routes: Routes = [
  { path: 'programa', component: GestionarCompetenciasComponent },
  { path: '', redirectTo: 'programa', pathMatch: 'full' },
];

