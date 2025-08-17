import { Component, AfterViewInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

// Core imports
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';

// Feature imports
import { HeroComponent } from './features/hero/hero.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    FooterComponent,
    HeroComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  

  ngAfterViewInit() { this.revealSections(); }
  @HostListener('window:scroll') onScroll() { this.revealSections(); }
  private revealSections() {
    const els = document.querySelectorAll('.fade-in');
    const trigger = window.innerHeight * 0.7;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < trigger) el.classList.add('visible');
    });
  }

  coach = {
    name: 'Trener Adam Kowalski',
    role: 'Trener główny • 15 lat doświadczenia',
    bio: 'Były zawodnik, licencjonowany szkoleniowiec. Specjalista od techniki bokserskiej i przygotowania motorycznego.',
    photo: '/assets/images/coach.png'
  };

  classes = [
    { icon: 'sports_mma', title: 'Boks – podstawy', desc: 'Stance, gardа, praca nóg, proste kombinacje.' },
    { icon: 'fitness_center', title: 'Kondycja & siła', desc: 'Obwody, core, mobility pod boks.' },
    { icon: 'groups', title: 'Sparingi kontrolowane', desc: 'Technika na lekko, praca w parach.' },
    { icon: 'self_improvement', title: 'Technika zaawansowana', desc: 'Uniki, kontry, timing, ringcraft.' },
    { icon: 'shield', title: 'Tarcza z trenerem', desc: 'Indywidualne rundy na tarczach.' },
    { icon: 'favorite', title: 'Junior • 10–15 lat', desc: 'Bezpieczeństwo, ruch, podstawy boksu dla młodych.' }
  ];

  benefits = [
    { icon: 'star', title: 'Pewność siebie', desc: 'Budujesz głowę i ciało jednocześnie.' },
    { icon: 'bolt', title: 'Kondycja', desc: 'VO₂ max, wytrzymałość i siła eksplozywna.' },
    { icon: 'psychology', title: 'Redukcja stresu', desc: 'Reset po pracy, endorfiny zamiast kofeiny.' },
    { icon: 'health_and_safety', title: 'Bezpieczeństwo', desc: 'Trenujesz w kontrolowanych warunkach.' },
    { icon: 'diversity_3', title: 'Ekipa', desc: 'Normalni ludzie, zero napinki.' },
    { icon: 'schedule', title: 'Elastyczne godziny', desc: 'Rano i wieczorem – dopasuj do siebie.' }
  ];

  pricing = [
    { name: 'Wejściówka', price: '30 zł', features: ['Jednorazowy wstęp', 'Dostęp do zajęć grupowych'] },
    { name: 'Karnet 8x', price: '180 zł', highlight: true, features: ['8 wejść/miesiąc', 'Zajęcia grupowe', 'Wolna sala'] },
    { name: 'Open', price: '230 zł', features: ['Nielimitowane wejścia', 'Sparingi i tarcze'] }
  ];

  news = [
    { id: 1, title: 'Nowa grupa początkująca od poniedziałku', content: 'Start o 18:00 – wbijasz, przedstawiasz się trenerowi i jedziesz.', publishedAt: new Date() },
    { id: 2, title: 'Sobotni open gym', content: 'Luźna sala 10:00–12:00. Worki, tarcze, mobilizacja.', publishedAt: new Date(Date.now() - 86400000) }
  ];

  schedule = [
    {
      day: 'Poniedziałek', slots: [
        { time: '18:00–19:00', name: 'Boks – podstawy' },
        { time: '19:00–20:00', name: 'Sparingi kontrolowane' }
      ]
    },
    {
      day: 'Wtorek', slots: [
        { time: '07:00–08:00', name: 'Kondycja & siła' },
        { time: '18:00–19:00', name: 'Technika zaawansowana' }
      ]
    },
    {
      day: 'Środa', slots: [
        { time: '18:00–19:00', name: 'Boks – podstawy' },
        { time: '19:00–20:00', name: 'Tarcza z trenerem' }
      ]
    },
    {
      day: 'Czwartek', slots: [
        { time: '07:00–08:00', name: 'Kondycja & siła' },
        { time: '18:00–19:00', name: 'Junior 10–15' }
      ]
    },
    {
      day: 'Piątek', slots: [
        { time: '18:00–19:00', name: 'Technika zaawansowana' }
      ]
    },
    {
      day: 'Sobota', slots: [
        { time: '10:00–12:00', name: 'Open gym (wolna sala)' }
      ]
    },
    { day: 'Niedziela', slots: [] }
  ];

}
