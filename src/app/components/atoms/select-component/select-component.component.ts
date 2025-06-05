import { Component, Input, forwardRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-component.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnChanges {
  @Input() id = '';
  @Input() name = '';
  @Input() label = '';
  @Input() required = false;
  @Input() options: { value: string | number; label: string }[] = [];
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
}