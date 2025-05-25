import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoordinadorSidebarComponent } from './components/organisms/cordinador-sidebar/sidebar-component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoordinadorSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'eduEval';
}


