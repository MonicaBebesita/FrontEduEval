import { Routes } from '@angular/router';
import { HomeComponent } from './competencia/pages/home/home.component';

export const routes: Routes = [
  { path: 'programa', component: HomeComponent },
  { path: '', redirectTo: 'programa', pathMatch: 'full' },
];
