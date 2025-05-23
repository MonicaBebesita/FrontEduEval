// src/app/pages/asignaturas/asignaturas.page.ts
import { Component } from '@angular/core';
import { AsignaturasTemplateComponentCA } from '../../components/templates/asignaturas/asignaturas.componentCA';

@Component({
  selector: 'app-asignaturas-page',
  standalone: true,
  imports: [AsignaturasTemplateComponentCA],
  template: `<app-asignaturas-templateCA />`,
})
export class AsignaturasPageComponentCA {}
