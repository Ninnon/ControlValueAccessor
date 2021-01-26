import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  public customerForm: FormGroup;
  public formSubscription: Subscription;

  constructor(private readonly formBuilder: FormBuilder) { }
 

  public ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      age: [25, [Validators.min(12), Validators.max(35)]],
      wantsTextNotifications: false
    });

    this.formSubscription = this.customerForm.get("age").valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(() => {
      console.log(this.customerForm);
      console.log("Form status:", this.customerForm.status);
    });
  }

  public ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

}
