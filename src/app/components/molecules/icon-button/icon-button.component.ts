import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  standalone: true,
  selector: 'app-icon-button',
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {
  @Input() icon = '';
  @Input() iconClass = 'me-1';
  @Input() label = '';
  @Input() btnClass = 'btn btn-primary';
  @Input() routerLink?: any[];
}
