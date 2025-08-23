import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/seguridad/auth.service';
import { filter } from 'rxjs/operators'; // Importar filter

type MenuItem = {
  label: string;
  route: string;
};

const menuConfig: { [key: string]: { icon: string; items: MenuItem[] } } = {
  coordinador: {
    icon: 'bi bi-diagram-3',
    items: [
      {
        label: 'Competencias y Resultados de Aprendizaje (CP/RP)',
        route: '/programa',
      },
      {
        label: 'Competencias por Asignatura (CA)',
        route: '/programa/CAasignaturas',
      },
    ],
  },
  profesor: {
    icon: 'bi bi-person-workspace',
    items: [
      { label: 'RA y Rúbricas', route: '/profesor' },
      { label: 'Evaluaciones', route: '/profesor/EvalAsignatura' },
    ],
  },
  evaluador: {
    icon: 'bi bi-clipboard-data',
    items: [{ label: 'Evaluaciones', route: '/profesor/EvalAsignatura' }],
  },
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private auth = inject(AuthService);

  isLoggedIn = false;
  userRoles: string[] = [];
  selectedRole: string = '';
  menuItems: MenuItem[] = [];
  icon: string = '';

  ngOnInit(): void {
    console.log('[SidebarComponent] ngOnInit iniciado');

    this.auth
      .getUserRoles()
      .pipe(filter((roles) => roles && roles.length > 0)) // Solo procede si hay roles
      .subscribe((roles) => {
        console.log('[SidebarComponent] Suscripción de roles recibida:', roles);
        this.userRoles = roles;
        this.selectedRole = roles[0]; // Seleccionar el primer rol por defecto
        console.log(
          '[SidebarComponent] Rol seleccionado por defecto:',
          this.selectedRole
        );
        this.configureMenu(this.selectedRole);
      });

    this.auth.isLoggedIn$().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log('[SidebarComponent] Estado de login actualizado:', loggedIn);
      if (!loggedIn) {
        this.userRoles = [];
        this.menuItems = [];
        this.icon = '';
        this.selectedRole = '';
      }
    });
  }

  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth < 992) {
      this.sidebarActive = false;
    }
  }

  onRoleChange() {
    console.log('[SidebarComponent] Cambio de rol a:', this.selectedRole);
    this.configureMenu(this.selectedRole);
    this.closeSidebarOnMobile();
  }

  configureMenu(role: string) {
    console.log('[SidebarComponent] Configurando menú para el rol:', role);
    // Convertimos el rol a minúsculas para evitar problemas de case-sensitivity
    const config = menuConfig[role.toLowerCase()];
    if (config) {
      this.icon = config.icon;
      this.menuItems = config.items;
    } else {
      this.icon = 'bi bi-question-circle';
      this.menuItems = [];
    }
    console.log('[SidebarComponent] Menu items configurados:', this.menuItems);
  }

  logout() {
    this.auth.logout();
  }
}
