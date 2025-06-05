import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // Importa ControlValueAccessor y NG_VALUE_ACCESSOR

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
        [(ngModel)]="value" [placeholder]="placeholder"
        [name]="name"
        (blur)="onTouched()" (ngModelChange)="onChange(value)" />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() name = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';

  value: any; // El valor interno del control
  onChange: any = () => {};
  onTouched: any = () => {};

  // Método para escribir el valor desde el padre
  writeValue(value: any): void {
    this.value = value;
  }

  // Método para registrar la función que se llamará cuando el valor cambie
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Método para registrar la función que se llamará cuando el control sea tocado
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Método para deshabilitar el control (opcional)
  setDisabledState?(isDisabled: boolean): void {
   
  }
}