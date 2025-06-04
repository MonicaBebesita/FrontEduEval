import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // Importa ControlValueAccessor y NG_VALUE_ACCESSOR

@Component({
  standalone: true,
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <select
        [id]="id"
        class="form-select"
        [(ngModel)]="value" [name]="name"
        (blur)="onTouched()"
        (ngModelChange)="onChange(value)"
      >
        <option value="" disabled selected>Seleccione una opción</option>
        <option *ngFor="let opt of options" [ngValue]="opt.value"> {{ opt.label }}
        </option>
      </select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() name = '';
  @Input() label = '';
  @Input() options: { value: string | number; label: string }[] = []; // Opciones con valor y etiqueta

  value: any; // El valor interno del control
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Alógica para deshabilitar el select si es necesario
  }
}