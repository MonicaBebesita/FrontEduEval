import { Component } from '@angular/core';
import { CoordinadorSidebarComponent } from './components/organisms/cordinador-sidebar/sidebar-coordinador-component';
import { ProfesorSidebarComponent } from './components/organisms/profesor-sidebar/profesor-sidebar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ProfesorSidebarComponent,RouterModule, CoordinadorSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'eduEval';

  constructor(private router: Router) {}

  get isLoginRoute() {
    return this.router.url === '/login';
  }
}
