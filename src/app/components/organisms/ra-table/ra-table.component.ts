// src/app/components/organisms/ra-table/ra-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  standalone: true,
  selector: 'app-ra-table',
  imports: [CommonModule],
  templateUrl: './ra-table.component.html'
})
export class RaTableComponent {
  @Input() resultados: { id: number; descripcion: string; fecha: Date }[] = [];
  @Output() anadirRa = new EventEmitter<any>();
}
