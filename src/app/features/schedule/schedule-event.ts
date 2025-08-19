export interface ScheduleEvent {
    id: number;
    /** 0=Pon, 1=Wt, 2=Śr, 3=Czw, 4=Pt, 5=Sob, 6=Nd */
    day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    title: string;
    start: string; // 'HH:mm'
    end: string;   // 'HH:mm'
    color?: string; // np. '#e3f2fd'
}
