// src/app/pages/asignaturas/asignaturas.page.ts
import { Component } from '@angular/core';
import { AsignaturasTemplateComponent } from '../../components/templates/asignaturas/asignaturas.component';

@Component({
  selector: 'app-asignaturas-page',
  standalone: true,
  imports: [AsignaturasTemplateComponent],
  template: `<app-asignaturas-template />`,
})
export class AsignaturasPageComponent {}
