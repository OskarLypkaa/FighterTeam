import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ScheduleEvent } from './schedule-event';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    getWeekEvents(): Observable<ScheduleEvent[]> {
        // MOCK – podmień na backend
        const mock: ScheduleEvent[] = [
            { id: 1, day: 0, title: 'Trening A', start: '09:30', end: '10:45', color: '#e3f2fd' },
            { id: 2, day: 0, title: 'Yoga', start: '12:00', end: '13:00', color: '#ffe0b2' },
            { id: 3, day: 2, title: 'Crossfit', start: '17:15', end: '18:00', color: '#c8e6c9' },
            { id: 4, day: 4, title: 'Stretch', start: '11:00', end: '11:45', color: '#f8bbd0' },
            { id: 5, day: 6, title: 'Open Gym', start: '14:30', end: '16:00', color: '#d1c4e9' },
        ];
        return of(mock).pipe();
        // Realny backend:
        // return this.http.get<ScheduleEvent[]>('/api/schedule/week');
    }
}
