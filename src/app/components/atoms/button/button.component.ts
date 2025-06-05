import { Component, Input, Output, EventEmitter } from '@angular/core'; // Importa Output y EventEmitter
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  template: `
    <button
      [class]="btnClass"
      [type]="type" [routerLink]="routerLink" (click)="onClick()" >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() btnClass = 'btn btn-primary';
  @Input() routerLink?: any[];
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Define el tipo de botón
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  
  onClick(): void {

    if (!this.routerLink) {
      this.clickEvent.emit();
    }
   
  }
}