// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { IconComponent } from '../../atoms/icon/icon.component';
// import { SidebarNavItemComponent } from '../../molecules/sidebar-nav-item-component/sidebar-nav-item-component.component';

// @Component({
//   standalone: true,
//   selector: 'app-sidebar',
//   imports: [CommonModule, SidebarNavItemComponent, IconComponent],
//   template: `
//     <aside class="sidebar p-3">
//       <div class="logo d-flex align-items-center mb-4">
//         <app-icon name="mortarboard-fill" customClass="me-2 fs-4"></app-icon>
//         <span class="fw-bold fs-5">EduEval</span>
//       </div>

//       <nav class="nav flex-column">
//         <app-sidebar-nav-item icon="person" label="Inicio" route="/inicio" />
//         <app-sidebar-nav-item icon="journal-text" label="Gestionar Rúbricas" route="/rubricas" />
//         <app-sidebar-nav-item icon="check2-square" label="Gestionar Competencias" route="/competencias" />
//         <app-sidebar-nav-item icon="bar-chart" label="Evaluar" route="/evaluar" />
//         <app-sidebar-nav-item icon="power" label="Cerrar Sesión" route="/logout" class="mt-auto" />
//       </nav>
//     </aside>
//   `
// })
// export class SidebarComponent {}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from '../../atoms/icon/icon.component';
import { SidebarNavItemComponent } from '../../molecules/sidebar-nav-item-component/sidebar-nav-item-component.component';

@Component({
  standalone: true,
  selector: 'app-sidebar-coordinador',
  imports: [CommonModule, SidebarNavItemComponent, IconComponent],
  templateUrl: './sidebar-coordinador.component.html',
  styleUrls: ['./sidebar-coordinador.component.css'],
})
export class CoordinadorSidebarComponent {
  navItems = [
    {
      icon: 'journal-text',
      label:
        'Competencias y Resultados de Aprendizaje del Programa (CP) y (RP)',
      route: '/programa',
    },

    {
      icon: 'check2-square',
      label: 'Competencias por Asignatura (CA)',
      route: '/programa/CAasignaturas',
    },

    {
      icon: 'power',
      label: 'Cerrar Sesión',
      route: '/logout',
      extraClass: 'mt-auto',
    },
  ];
}
