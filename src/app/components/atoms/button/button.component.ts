import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  template: `
    <button [class]="btnClass" [routerLink]="routerLink">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() btnClass = 'btn btn-primary';
  @Input() routerLink?: any[]; // permite navegación
}
