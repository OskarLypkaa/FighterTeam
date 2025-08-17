import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  mobileOpen = false;

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  onNavClick(event: MouseEvent, href: string) {
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.mobileOpen = false;
    }
  }
}
