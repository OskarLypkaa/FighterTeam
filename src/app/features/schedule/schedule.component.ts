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
  readonly slotPx = 15;        // wysokość slota w px (musi pasować do SCSS)

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
  readonly todayIdx: DayIdx = ((new Date().getDay() + 6) % 7) as DayIdx;
  // Etykiety godzin
  readonly hours = Array.from({ length: this.endHour - this.startHour }, (_, i) => this.startHour + i);


  // 👇 MOCK – ŁADUJE SIĘ NATYCHMIAST (bez serwisu/HTTP)
  private readonly mockEvents: ScheduleEvent[] = [
    // Poniedziałek (0)
    { id: 1, day: 0, title: 'Boks – Podstawy', start: '09:00', end: '10:00', color: '#ff6b6b' },
    { id: 2, day: 0, title: 'Kickboxing – Początkujący', start: '10:15', end: '11:15', color: '#ffb74d' },
    { id: 3, day: 0, title: 'Boks – Kobiety', start: '12:00', end: '13:00', color: '#f48fb1' },
    { id: 4, day: 0, title: 'Boks – Worki / Kondycja', start: '15:00', end: '16:00', color: '#ef9a9a' },
    { id: 5, day: 0, title: 'K-1 – Drille', start: '17:00', end: '18:00', color: '#b39ddb' },
    { id: 6, day: 0, title: 'Boks – Sparing', start: '18:15', end: '19:45', color: '#e57373' },

    // Wtorek (1)
    { id: 7, day: 1, title: 'Boks – Kondycja', start: '09:30', end: '10:15', color: '#ff8a65' },
    { id: 8, day: 1, title: 'Kickboxing – Technika', start: '11:00', end: '12:15', color: '#ffcc80' },
    { id: 9, day: 1, title: 'Kickboxing – Zaawansowani', start: '16:15', end: '17:15', color: '#ffa726' },
    { id: 10, day: 1, title: 'K-1 – Tarcze', start: '17:30', end: '18:30', color: '#ab47bc' },
    { id: 11, day: 1, title: 'Boks – Technika', start: '19:00', end: '20:00', color: '#ef5350' },

    // Środa (2)
    { id: 12, day: 2, title: 'Boks – Podstawy', start: '09:00', end: '10:00', color: '#ff6b6b' },
    { id: 13, day: 2, title: 'Kickboxing – Mixed Level', start: '12:00', end: '13:00', color: '#ffb74d' },
    { id: 14, day: 2, title: 'K-1 – Taktyka', start: '17:15', end: '18:15', color: '#9fa8da' },
    { id: 15, day: 2, title: 'K-1 – Sparing', start: '18:30', end: '19:45', color: '#8e24aa' },

    // Czwartek (3)
    { id: 16, day: 3, title: 'Kickboxing – Początkujący', start: '09:30', end: '10:30', color: '#ffb74d' },
    { id: 17, day: 3, title: 'Boks – Tarcze / Mittsy', start: '11:00', end: '12:00', color: '#ef5350' },
    { id: 18, day: 3, title: 'K-1 – Kombinacje', start: '17:00', end: '18:00', color: '#b39ddb' },
    { id: 19, day: 3, title: 'Boks – Sparing (Team)', start: '18:15', end: '19:45', color: '#e57373' },

    // Piątek (4)
    { id: 20, day: 4, title: 'Boks – Praca Nóg', start: '09:00', end: '10:00', color: '#ff6b6b' },
    { id: 21, day: 4, title: 'Kickboxing – Tarcze', start: '10:15', end: '11:15', color: '#ffcc80' },
    { id: 22, day: 4, title: 'K-1 – Kondycja', start: '12:00', end: '13:00', color: '#9fa8da' },
    { id: 23, day: 4, title: 'Otwarta Sala', start: '14:00', end: '16:00', color: '#b3e5fc' },
    { id: 24, day: 4, title: 'Fight Team – K-1 Drille', start: '17:30', end: '19:00', color: '#7e57c2' },

    // Sobota (5)
    { id: 25, day: 5, title: 'Dzieci – Kickboxing', start: '10:00', end: '11:00', color: '#81c784' },
    { id: 26, day: 5, title: 'Boks – Podstawy', start: '11:15', end: '12:15', color: '#ff6b6b' },
    { id: 27, day: 5, title: 'K-1 – Interwały', start: '12:30', end: '13:30', color: '#b39ddb' },
    { id: 28, day: 5, title: 'Sparing Otwarty (Boks/K-1)', start: '15:00', end: '17:00', color: '#ef5350' },

    // Niedziela (6)
    { id: 29, day: 6, title: 'Otwarta Sala', start: '10:00', end: '12:00', color: '#b3e5fc' },
    { id: 30, day: 6, title: 'Boks – Technika', start: '12:15', end: '13:15', color: '#ef5350' },
    { id: 31, day: 6, title: 'Kickboxing – Rodzinny', start: '13:30', end: '14:30', color: '#ffcc80' },
    { id: 32, day: 6, title: 'K-1 – Strategia', start: '17:00', end: '18:30', color: '#7e57c2' },
  ];

  eventsByDay: Record<DayIdx, ScheduleEvent[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };



  isToday(idx: DayIdx): boolean { return idx === this.todayIdx; }

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

  // ---- MOBILE STATE ----
  openDays: boolean[] = [true, true, true, true, true, true, true]; // start: wszystko otwarte

  get mobileAllOpen(): boolean {
    return this.openDays.every(Boolean);
  }

  toggleDay(idx: DayIdx): void {
    this.openDays[idx] = !this.openDays[idx];
  }

  toggleAllMobile(): void {
    const target = !this.mobileAllOpen;
    for (let i = 0; i < this.openDays.length; i++) this.openDays[i] = target;
  }
}
