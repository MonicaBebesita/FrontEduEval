
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasListComponent } from '../../../components/organisms/asignaturas-list/asignaturas-list.component';

@Component({
  selector: 'app-asignaturas-template',
  standalone: true,
  imports: [CommonModule, AsignaturasListComponent],
  templateUrl:'asignatura-template.component.html'
})
export class AsignaturasTemplateComponent {
  @Input() titulo = 'Asignaturas';
  @Input() rutaDestino = '/programa';
  @Input() asignaturas: { id: string; nombre: string; descripcion: string; color: string }[] = [];
}
