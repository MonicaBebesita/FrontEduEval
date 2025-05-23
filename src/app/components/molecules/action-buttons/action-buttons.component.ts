import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms/icon/icon.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-action-buttons',
  imports: [CommonModule, IconComponent, RouterModule],
  templateUrl: './action-buttons.component.html',
})
export class ActionButtonsComponent {
  @Input() id!: number;
  @Input() rutaRubrica!: string;
  @Output() onDelete = new EventEmitter<number>();


  ngOnInit() {
  console.log('Ruta Rubrica:', this.rutaRubrica);
  console.log('ID:', this.id);
}
}
