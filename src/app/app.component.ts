import { Component, OnDestroy, OnInit } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crypto-converter';

  amount:          number = 0;
  currency:        string = 'USD';
  loading:         boolean = false;
  errorText:       string = '';
  cryptoConverter: number = 0;

  subscriptionId: any;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.getCryptoValue();

    this.subscriptionId = setInterval(() => {
      this.getCryptoValue();
    }, 10000)
  }

  ngOnDestroy(): void {
    if (this.subscriptionId) {
      clearInterval(this.subscriptionId);
    }
  }

  amountChanged(amount: number) {
    this.amount = amount;
    this.getCryptoValue();
  }

  currencyChanged(currency: string) {
    this.currency = currency;
    this.getCryptoValue();
  }

  getCryptoValue() {
    this.loading = true;
    this.cryptoService.getAmmount(this.currency).subscribe({
      next: (response) => {
        if (response.value) {
          this.cryptoConverter = parseFloat((this.amount * response.value).toFixed(2));
        } else {
          this.errorText = response.error;
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorText = 'Opps! Something went wrong.';
        this.loading   = false;
      }
    })
  }
}
