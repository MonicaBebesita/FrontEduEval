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
  @Output() onDelete = new EventEmitter<number>();
}
