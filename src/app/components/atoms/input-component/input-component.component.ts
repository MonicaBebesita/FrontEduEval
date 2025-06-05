import {
  Component, Input, forwardRef, ViewChild, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-component.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  @Input() id = '';
  @Input() name = '';
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() min?: number;
  @Input() required = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() formResetTrigger: boolean = false;

  @ViewChild(NgModel) model!: NgModel;
  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formResetTrigger'] && this.model?.control) {
      this.model.control.markAsPristine();
      this.model.control.markAsUntouched();
    }
  }
  ngAfterViewInit(): void {
    // Forzar actualización del estado del validador
    setTimeout(() => {
      if (this.model?.control) {
        this.model.control.updateValueAndValidity();
      }
    }, 0);
  }
  blockNegativeInput(event: KeyboardEvent) {
    if (event.key === '-' ) {
      event.preventDefault();
    }
  }
}