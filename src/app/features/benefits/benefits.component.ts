import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {
  benefits = [
    { icon: 'star', title: 'Pewność siebie', desc: 'Budujesz głowę i ciało jednocześnie.' },
    { icon: 'bolt', title: 'Kondycja', desc: 'VO₂ max, wytrzymałość i siła eksplozywna.' },
    { icon: 'psychology', title: 'Redukcja stresu', desc: 'Reset po pracy, endorfiny zamiast kofeiny.' },
    { icon: 'health_and_safety', title: 'Bezpieczeństwo', desc: 'Trenujesz w kontrolowanych warunkach.' },
    { icon: 'diversity_3', title: 'Ekipa', desc: 'Normalni ludzie, zero napinki.' },
    { icon: 'schedule', title: 'Elastyczne godziny', desc: 'Rano i wieczorem – dopasuj do siebie.' }
  ];
}
