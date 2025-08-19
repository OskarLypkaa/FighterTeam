import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsService } from './news.service';
import { NewsItem } from './news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  protected news: NewsItem[] = [];
  protected loading = true;
  protected error = false;

  private expanded = new Set<number>();

  // Scrollbar auto-show
  protected isScrolling = false;
  private scrollHideTimer: number | null = null;

  // Lightbox state
  protected lightboxOpen = false;
  protected lbImages: string[] = [];
  protected lbIndex = 0;
  protected lbTitle = '';

  // For description
  protected maxChars = 180;
  private readonly svc = inject(NewsService);

  ngOnInit(): void {
    // Wszystkie aktualności (nie tylko 3)
    this.svc.getAll().subscribe({
      next: data => { this.news = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  // === Accordion ===
  isExpanded(id: number): boolean { return this.expanded.has(id); }

  toggle(id: number): void {
    this.expanded.has(id) ? this.expanded.delete(id) : this.expanded.add(id);
    this.expanded = new Set(this.expanded);
  }

  // === Scrollbar show/hide ===
  onListScroll(): void {
    this.isScrolling = true;
    if (this.scrollHideTimer !== null) window.clearTimeout(this.scrollHideTimer);
    this.scrollHideTimer = window.setTimeout(() => { this.isScrolling = false; }, 800);
  }

  // === Images / thumbs ===
  thumbOf(n: NewsItem): string { return n.images?.[0] ?? this.fallbackImg(n.id); }
  imgError(e: Event, id: number): void { (e.target as HTMLImageElement).src = this.fallbackImg(id); }
  private fallbackImg(seed: number): string { return `https://placehold.co/1200x800?text=Boxing+${seed}`; }

  // === Lightbox ===
  openLightbox(item: NewsItem, index = 0): void {
    this.lbImages = item.images ?? [];
    if (!this.lbImages.length) return;
    this.lbIndex = Math.max(0, Math.min(index, this.lbImages.length - 1));
    this.lbTitle = item.title;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  closeLightbox(): void {
    this.lightboxOpen = false;
    this.lbImages = []; this.lbIndex = 0; this.lbTitle = '';
    document.body.style.overflow = '';
  }
  prev(): void { if (this.lbImages.length) this.lbIndex = (this.lbIndex - 1 + this.lbImages.length) % this.lbImages.length; }
  next(): void { if (this.lbImages.length) this.lbIndex = (this.lbIndex + 1) % this.lbImages.length; }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(e: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (e.key === 'Escape') this.closeLightbox();
    else if (e.key === 'ArrowLeft') this.prev();
    else if (e.key === 'ArrowRight') this.next();
  }
}
