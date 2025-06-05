// sidebar.component.ts
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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
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

  onRoleChange() {
    console.log('[SidebarComponent] Cambio de rol a:', this.selectedRole);
    this.configureMenu(this.selectedRole);
  }

  configureMenu(role: string) {
    console.log('[SidebarComponent] Configurando menú para el rol:', role);
    switch (role) {
      case 'coordinador':
        this.icon = 'bi bi-diagram-3';
        this.menuItems = [
          {
            label: 'Competencias y Resultados de Aprendizaje (CP/RP)',
            route: '/programa',
          },

          {
            label: 'Competencias por Asignatura (CA)',
            route: '/programa/CAasignaturas',
          },
        ];
        break;
      case 'profesor':
        this.icon = 'bi bi-person-workspace';
        this.menuItems = [
          { label: 'RA y Rúbricas', route: '/profesor' },
          { label: 'Evaluaciones', route: '/profesor/EvalAsignatura' },
        ];
        break;
      case 'evaluador':
        this.icon = 'bi bi-clipboard-data';
        this.menuItems = [
          { label: 'Evaluaciones', route: '/profesor/EvalAsignatura' },
        ];
        break;
      default:
        this.icon = 'bi bi-question-circle';
        this.menuItems = [];
        break;
    }
    console.log('[SidebarComponent] Menu items configurados:', this.menuItems);
  }

  logout() {
    this.auth.logout();
  }
}
