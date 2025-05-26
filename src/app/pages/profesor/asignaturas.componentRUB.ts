// src/app/pages/asignaturas/asignaturas.page.ts
import { Component } from '@angular/core';
import { AsignaturasTemplateComponentRUB } from '../../components/templates/asignaturas/asignaturas.componentRUB';

@Component({
  selector: 'app-asignaturas-page',
  standalone: true,
  imports: [AsignaturasTemplateComponentRUB],
  template: `<app-asignaturas-templateRUB />`,
})
export class AsignaturasPageComponentRUB {}
