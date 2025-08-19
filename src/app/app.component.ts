import { Component, AfterViewInit, HostListener } from '@angular/core';

// Core imports
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';

// Feature imports
import { HeroComponent } from './features/hero/hero.component';
import { ClassesComponent } from "./features/classes/classes.component";
import { PricingComponent } from "./features/pricing/pricing.component";
import { ScheduleComponent } from "./features/schedule/schedule.component";
import { BenefitsComponent } from "./features/benefits/benefits.component";
import { ContactComponent } from "./features/contact/contact.component";
import { CoachComponent } from "./features/coach/coach.component";
import { NewsComponent } from "./features/news/news.component";
import { QuestionsComponent } from './features/questions/questions.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    ClassesComponent,
    PricingComponent,
    ScheduleComponent,
    BenefitsComponent,
    ContactComponent,
    CoachComponent,
    NewsComponent,
    QuestionsComponent
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

}
