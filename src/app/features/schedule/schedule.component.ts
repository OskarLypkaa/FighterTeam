import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
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
