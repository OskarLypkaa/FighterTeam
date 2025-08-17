import { Component, AfterViewInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.revealSections();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.revealSections();
  }

  private revealSections() {
    const elements = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }
}
