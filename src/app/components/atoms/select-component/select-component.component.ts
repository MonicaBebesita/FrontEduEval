// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   standalone: true,
//   selector: 'app-select',
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="mb-3">
//       <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
//       <select [id]="id" class="form-select" [(ngModel)]="model" [name]="name">
//         <option value="" disabled selected>Seleccione una opción</option>
//         <option *ngFor="let opt of options" [value]="opt.value">
//           {{ opt.label }}
//         </option>
//       </select>
//     </div>
//   `,
// })
// export class SelectComponent {
//   @Input() id = '';
//   @Input() name = '';
//   @Input() label = '';
//   @Input() model: any;
//   @Input() options: { value: string; label: string }[] = [];
// }
import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
        [name]="name"
        [value]="value"
        (change)="onChangeHandler($event)"
      >
        <option value="" disabled selected>Seleccione una opción</option>
        <option *ngFor="let opt of options" [value]="opt.value">
          {{ opt.label }}
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
  @Input() options: { value: string; label: string }[] = [];

  value: any = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  onChangeHandler(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
