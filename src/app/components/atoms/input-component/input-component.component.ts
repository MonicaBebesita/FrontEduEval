// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   standalone: true,
//   selector: 'app-input',
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="mb-3">
//       <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
//       <input
//         [id]="id"
//         [type]="type"
//         class="form-control"
//         [(ngModel)]="model"
//         [placeholder]="placeholder"
//         [name]="name"
//       />
//     </div>
//   `,
// })
// export class InputComponent {
//   @Input() id = '';
//   @Input() name = '';
//   @Input() label = '';
//   @Input() type = 'text';
//   @Input() placeholder = '';
//   @Input() model: any;
// }
import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
        [placeholder]="placeholder"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
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

  value: any = '';

  // Funciones que Angular setea para interactuar con el ngModel
  onChange = (value: any) => {};
  onTouched = () => {};

  // Método llamado por Angular para pasar el valor del modelo al componente
  writeValue(value: any): void {
    this.value = value;
  }

  // Angular le pasa estas funciones al componente para que las llame
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Si el input debe deshabilitarse (opcional)
  setDisabledState?(isDisabled: boolean): void {
    // Aquí podrías agregar lógica para deshabilitar el input
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target?.value ?? '';
    this.value = value;
    this.onChange(value);
  }
}
