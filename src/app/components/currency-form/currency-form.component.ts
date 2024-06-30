import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {

  form!: FormGroup;

  @Output() onAmountChange   = new EventEmitter<number>();
  @Output() onCurrencyChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: [0, [
        Validators.required
      ]],
      currency: ['USD', [
        Validators.required
      ]] 
    })

    this.form.get('amount')?.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged() // Only emit when the current value is different than the last
    ).subscribe(amount => {
      this.onAmountChange.emit(amount);
    })

    this.form.get('currency')?.valueChanges.subscribe(currency => {
      this.onCurrencyChange.emit(currency);
    })
    
  }


 }
