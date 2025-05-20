import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <select [id]="id" class="form-select" [(ngModel)]="model" [name]="name">
        <option value="" disabled selected>Seleccione una opción</option>
        <option *ngFor="let opt of options" [value]="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  `,
})
export class SelectComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() label = '';
  @Input() model: any;
  @Input() options: { value: string; label: string }[] = [];
}
