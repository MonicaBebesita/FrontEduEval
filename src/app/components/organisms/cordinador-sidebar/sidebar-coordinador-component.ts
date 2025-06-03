import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgParticlesModule } from 'ng-particles';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SidebarNavItemComponent } from '../../molecules/sidebar-nav-item-component/sidebar-nav-item-component.component';

@Component({
  standalone: true,
  selector: 'app-sidebar-coordinador',
  imports: [CommonModule, SidebarNavItemComponent, IconComponent, NgParticlesModule],
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
