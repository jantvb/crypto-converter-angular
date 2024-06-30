import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnChanges {

  @Input() cryptoConverter!: number;
  @Input() loading!:         boolean;

  diff:     number = 0;
  prevDiff: number = 0;
  valueUp:  boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cryptoConverter']) {
      const currentValue  = changes['cryptoConverter']?.currentValue;
      const previousValue = changes['cryptoConverter']?.previousValue;

      const difference = currentValue - previousValue;

      this.diff = isNaN(difference) ? 0 : parseFloat(difference.toFixed(2));;

      if (this.diff >= this.prevDiff) {
        this.valueUp = true;
      } else {
        this.valueUp = false;
      }

      this.prevDiff = this.diff;
    }
    
  }

}
