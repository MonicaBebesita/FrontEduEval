import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-icon',
  imports: [CommonModule],
  template: `<i [class]="'bi bi-' + name + ' ' + customClass"></i>`
})
export class IconComponent {
  @Input() name!: string;
  @Input() customClass = '';
}
