import { Component } from '@angular/core';

@Component({
  selector: 'app-coach',
  imports: [],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss'
})
export class CoachComponent {
  coach = {
    name: 'Trener Adam Kowalski',
    role: 'Trener główny • 15 lat doświadczenia',
    bio: 'Były zawodnik, licencjonowany szkoleniowiec. Specjalista od techniki bokserskiej i przygotowania motorycznego.',
    photo: '/assets/images/coach.png'
  };
}
