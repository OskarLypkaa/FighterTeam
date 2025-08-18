import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricing = [
    { name: 'Wejściówka', price: '30 zł', features: ['Jednorazowy wstęp', 'Dostęp do zajęć grupowych'] },
    { name: 'Karnet 8x', price: '180 zł', highlight: true, features: ['8 wejść/miesiąc', 'Zajęcia grupowe', 'Wolna sala'] },
    { name: 'Open', price: '230 zł', features: ['Nielimitowane wejścia', 'Sparingi i tarcze'] }
  ];

}
