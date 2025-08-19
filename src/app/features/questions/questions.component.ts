import { Component } from '@angular/core';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  questions = [
    {
      icon: 'how_to_reg',
      title: 'Jak zapisać się na zajęcia?',
      desc: 'Nie prowadzimy zapisów — po prostu przyjdź na trening. Wpadnij 10–15 min wcześniej, żeby wypełnić krótką zgodę/RODO i pogadać z trenerem o poziomie. Jeśli jesteś niepełnoletni, przygotuj zgodę opiekuna.'
    },
    {
      icon: 'backpack',
      title: 'Co mam zabrać na zajęcia?',
      desc: 'Na start wystarczą koszulka, spodenki/legginsy i woda. Obuwie halowe lub czyste podeszwy na zmianę. Po 2–3 treningach warto mieć owijki (ok. 4 m) i rękawice 12–14 oz; później ochraniacz na zęby, a do kickboxingu — nagolenniki.'
    },
    {
      icon: 'credit_card',
      title: 'Czy można płacić kartą?',
      desc: 'Tak — przyjmujemy płatności kartą i zbliżeniowo. Gotówka też jest OK.'
    },
    {
      icon: 'card_membership',
      title: 'Czy jest honorowany MultiSport?',
      desc: 'Nie, MultiSport nie jest u nas honorowany. Obowiązują wejścia jednorazowe i/lub karnety według cennika.'
    },
  ];
}
