import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from '../../atoms/icon/icon.component';
import { SidebarNavItemComponent } from '../../molecules/sidebar-nav-item-component/sidebar-nav-item-component.component';

@Component({
  standalone: true,
  selector: 'app-sidebar-profesor',
  imports: [CommonModule, SidebarNavItemComponent, IconComponent],
  templateUrl: './profesor-sidebar.component.html',
  styleUrls: ['./profesor-sidebar.component.css'],
})
export class ProfesorSidebarComponent {

  navItems = [
    {
      icon: 'journal-text',
      label: 'Resultados de aprendizaje (RA) y Rubricas',
      route: '/profesor',
    },

    {
      icon: 'check2-square',
      label: 'Evaluaciones',
      route: '/profesor/EvalAsignatura',
    },

    {
      icon: 'power',
      label: 'Cerrar Sesión',
      route: '/logout',
      extraClass: 'mt-auto',
    },
  ];
}
