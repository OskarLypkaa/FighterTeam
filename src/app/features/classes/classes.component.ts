import { Component } from '@angular/core';

@Component({
  selector: 'app-classes',
  imports: [],
  templateUrl: './classes.component.html'
})
export class ClassesComponent {
  classes = [
    { icon: 'sports_mma', title: 'Boks – podstawy', desc: 'Stójka, garda, praca nóg, proste kombinacje. Grupa początkująca.' },
    { icon: 'sports_kabaddi', title: 'Kickboxing – podstawy', desc: 'Kopy, kolana, łączenie z boksem. Grupa początkująca.' },
    { icon: 'military_tech', title: 'K-1 – technika i taktyka', desc: 'Zasady K-1, kombinacje, praca w klinczu. Grupa zaawansowana.' },
    { icon: 'groups', title: 'Sparingi kontrolowane', desc: 'Technika na lekko, scenariusze walki, bezpieczeństwo. Dla wszystkich.' },
    { icon: 'school', title: 'Grupa początkująca', desc: 'Program wprowadzający: podstawy boksu i kickboxingu od zera.' },
    { icon: 'workspace_premium', title: 'Grupa zaawansowana', desc: 'Zaawansowane kombinacje, kontry, ringcraft, przygotowanie pod walki.' }
  ];
}
