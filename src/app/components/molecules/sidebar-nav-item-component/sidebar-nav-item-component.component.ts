import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IconComponent } from "../../atoms/icon/icon.component";

@Component({
  selector: 'app-sidebar-nav-item',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <a class="nav-link d-flex align-items-center" [routerLink]="link" routerLinkActive="active">
      <app-icon [name]="icon" class="me-2"></app-icon> {{ label }}
    </a>
  `
})
export class SidebarNavItemComponent {
  @Input() link = '';
  @Input() icon = '';
  @Input() label = '';
}
