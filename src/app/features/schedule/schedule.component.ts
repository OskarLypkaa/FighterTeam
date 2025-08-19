import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type DayIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ScheduleEvent {
  id: number;
  /** 0=Pon, 1=Wt, 2=Śr, 3=Czw, 4=Pt, 5=Sob, 6=Nd */
  day: DayIdx;
  title: string;
  start: string; // 'HH:mm'
  end: string;   // 'HH:mm'
  color?: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  // Ustawienia siatki
  readonly startHour = 9;
  readonly endHour = 20;       // exclusive
  readonly slotMinutes = 15;   // co 15 min
  readonly slotPx = 24;        // wysokość slota w px (musi pasować do SCSS)

  readonly totalMinutes = (this.endHour - this.startHour) * 60;
  readonly slotCount = this.totalMinutes / this.slotMinutes;

  // Dni tygodnia (Pon–Nd)
  readonly days = [
    { index: 0 as DayIdx, label: 'Poniedziałek' },
    { index: 1 as DayIdx, label: 'Wtorek' },
    { index: 2 as DayIdx, label: 'Środa' },
    { index: 3 as DayIdx, label: 'Czwartek' },
    { index: 4 as DayIdx, label: 'Piątek' },
    { index: 5 as DayIdx, label: 'Sobota' },
    { index: 6 as DayIdx, label: 'Niedziela' },
  ];

  // Etykiety godzin
  readonly hours = Array.from({ length: this.endHour - this.startHour }, (_, i) => this.startHour + i);

  // 👇 MOCK – ŁADUJE SIĘ NATYCHMIAST (bez serwisu/HTTP)
  private readonly mockEvents: ScheduleEvent[] = [
    { id: 1, day: 0, title: 'Trening A', start: '09:30', end: '10:45', color: '#e3f2fd' },
    { id: 2, day: 0, title: 'Yoga', start: '12:00', end: '13:00', color: '#ffe0b2' },
    { id: 3, day: 2, title: 'Crossfit', start: '17:15', end: '18:00', color: '#c8e6c9' },
    { id: 4, day: 4, title: 'Stretch', start: '11:00', end: '11:45', color: '#f8bbd0' },
    { id: 5, day: 6, title: 'Open Gym', start: '14:30', end: '16:00', color: '#d1c4e9' },
  ];

  eventsByDay: Record<DayIdx, ScheduleEvent[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

  ngOnInit(): void {
    // od razu grupujemy mock do kolumn
    this.eventsByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    for (const ev of this.mockEvents) this.eventsByDay[ev.day].push(ev);
  }

  /** 'HH:mm' -> minuty od północy */
  private hmToMinutes(hm: string): number {
    const [h, m] = hm.split(':').map(Number);
    return (h * 60 + m) | 0;
  }

  /** Offset eventu w % od góry dnia */
  timeToOffsetPct(hm: string): number {
    const minutes = this.hmToMinutes(hm);
    const start = this.startHour * 60;
    const clamped = Math.max(0, Math.min(this.totalMinutes, minutes - start));
    return (clamped / this.totalMinutes) * 100;
  }

  /** Wysokość eventu w % */
  durationPct(startHm: string, endHm: string): number {
    const start = this.hmToMinutes(startHm);
    const end = this.hmToMinutes(endHm);
    const min = Math.max(start, this.startHour * 60);
    const max = Math.min(end, this.startHour * 60 + this.totalMinutes);
    const dur = Math.max(0, max - min);
    return (dur / this.totalMinutes) * 100;
  }

  /** Wysokość kolumny dnia w px (żeby skala się zgadzała z siatką) */
  get dayHeightPx(): number {
    return this.slotCount * this.slotPx;
  }
}
