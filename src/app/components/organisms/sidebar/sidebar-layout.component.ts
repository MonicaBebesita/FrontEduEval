// layout/sidebar-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="d-flex">
      <app-sidebar></app-sidebar>
      <div class="flex-grow-1 p-3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class SidebarLayoutComponent {}
