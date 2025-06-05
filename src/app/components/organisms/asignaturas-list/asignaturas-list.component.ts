import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturaCardComponent } from '../../atoms/asignatura-card/asignatura-card.component';

@Component({
  selector: 'app-asignaturas-list',
  standalone: true,
  imports: [CommonModule, AsignaturaCardComponent],
  templateUrl:'asignaturas-list.component.html' 
})
export class AsignaturasListComponent {
  @Input() asignaturas: any[] = [];
  @Input() rutaDestino!: string 
}
