import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <input
        [id]="id"
        [type]="type"
        class="form-control"
        [(ngModel)]="model"
        [placeholder]="placeholder"
        [name]="name"
      />
    </div>
  `,
})
export class InputComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() model: any;
}
