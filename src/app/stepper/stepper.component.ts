import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
		{
      provide: NG_VALUE_ACCESSOR, // This registers this as an NG_VALUE_ACCESSOR provider. It specifies a class that implements the ControlValueAccessor.
                                  // It is used by Angular to setup the synchronizing with the form control
			useExisting: forwardRef(() => StepperComponent), // forwardRef allows us to refer to references which are not yet defined.
			multi: true, // Means that one provider token provides an array of elements. 
		},
	],
})
export class StepperComponent implements ControlValueAccessor {
  public currentValue;
  public isMinDisabled: boolean;
  public isMaxDisabled: boolean;

  public onChange: (currentValue) => void; // Callback function to register on UI change
	public onTouched: () => void; // Callback function to register on element touch

  constructor() { }

  // This gets called automatically when the component is created. This will write the value of the 'control' if the value changes programatically
  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  // This gets called automatically when the component is created and saves a reference to the function we will call programatically
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // This gets called automatically when the component is created and saves a reference to the function we will call programatically
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public changeValue(value: number) {
    this.currentValue += value;
    this.onChange(this.currentValue);
    this.onTouched();
    this.setDisabledStates();
  }

  public setDisabledStates(): void {
    this.isMaxDisabled = this.currentValue >= 35;
    this.isMinDisabled = this.currentValue <= 0;
  }
}
