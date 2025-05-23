import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionButtonsComponent } from '../../molecules/action-buttons/action-buttons.component';

@Component({
  selector: 'app-competencias-table',
  imports: [CommonModule, ActionButtonsComponent],
  templateUrl: './competencias-table.component.html',
  styleUrl: './competencias-table.component.css',
})
export class CompetenciasTableComponent {
  @Input() rutaRubrica!: string
  @Input() competencias: any[] = [];
  @Output() onDelete = new EventEmitter<number>();
}
