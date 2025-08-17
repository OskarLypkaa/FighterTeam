import { Component, AfterViewInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

type NewsItem = { id: string; title: string; content: string; publishedAt: string };
type PricePlan = { name: string; price: string; features: string[]; highlight?: boolean };
type SimpleTile = { title: string; desc: string; icon: string }; // icon = nazwa Material Icon

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  currentYear = new Date().getFullYear();

  ngAfterViewInit() { this.revealSections(); }
  @HostListener('window:scroll') onScroll() { this.revealSections(); }
  private revealSections() {
    const els = document.querySelectorAll('.fade-in');
    const trigger = window.innerHeight * 0.85;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < trigger) el.classList.add('visible');
    });
  }

  classes: SimpleTile[] = [
    { title: 'Boks dla początkujących', desc: 'Technika, poruszanie, dystans, kondycja.', icon: 'sports_mma' },
    { title: 'Grupa zaawansowana', desc: 'Kombinacje, tarcza, sparingi kontrolowane.', icon: 'fitness_center' },
    { title: 'Trening indywidualny', desc: '1:1 z trenerem, plan pod cele, analiza postępów.', icon: 'target' } // 'target' nie istnieje w core; alternatywy: 'center_focus_strong' / 'track_changes'
  ];

  benefits: SimpleTile[] = [
    { title: 'Forma i zdrowie', desc: 'Lepsza wydolność, siła i koordynacja.', icon: 'favorite' },
    { title: 'Dyscyplina', desc: 'Regularność, cel, konsekwencja.', icon: 'timer' },
    { title: 'Pewność siebie', desc: 'Świadomość ciała i głowy — także poza ringiem.', icon: 'shield' } // alternatywa: 'shield' / 'verified_user'
  ];

  news: NewsItem[] = [
    { id: '1', title: 'Nabór wrzesień', content: 'Startują zapisy do grup początkujących. Limit miejsc!', publishedAt: new Date().toISOString() },
    { id: '2', title: 'Sparing sobota', content: 'Sparing otwarty — sobota 10:00. Kaski obowiązkowe.', publishedAt: new Date(Date.now() - 86400000).toISOString() },
  ];

  pricing: PricePlan[] = [
    { name: 'Wejście jednorazowe', price: '40 zł', features: ['1 trening', 'Dla każdej grupy'] },
    { name: 'Karnet miesięczny', price: '169 zł', features: ['Bez limitu wejść', 'Wszystkie grupy'], highlight: true },
    { name: 'Junior (do 18 lat)', price: '129 zł', features: ['Bez limitu wejść', 'Opieka trenerska'] },
  ];

  coach = {
    name: 'Trener Adam Kowalski',
    role: 'Trener główny • 15 lat doświadczenia',
    bio: 'Były zawodnik, licencjonowany szkoleniowiec. Specjalista od techniki bokserskiej i przygotowania motorycznego.',
    photo: '/assets/images/coach.png' 
  };
}
