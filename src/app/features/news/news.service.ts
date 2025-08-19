import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { NewsItem } from './news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
    getAll(): Observable<NewsItem[]> {
        const now = Date.now();
        const mk = (id: number, hoursAgo: number, title: string, description: string, imgCount = 5): NewsItem => ({
            id,
            title,
            description,
            publishedAt: new Date(now - hoursAgo * 3_600_000),
            images: this.imagesSet(id, imgCount),
        });

        const mock: NewsItem[] = [
            mk(701, 1, 'Nowa grupa początkująca od poniedziałku', 'Start o 18:00 – wpadasz, przedstawiasz się trenerowi i jedziesz.', 6),
            mk(702, 26, 'Sobotni open gym', 'Luźna sala 10:00–12:00. Worki, tarcze, mobilizacja.', 4),
            mk(703, 72, 'Sparingi dla zaawansowanych', 'Środa 19:30. Kaski obowiązkowe. Tempo kontrolowane.', 5),
            mk(704, 120, 'Nowe rękawice w sklepie klubowym', 'Dostawa 12oz i 14oz. Cztery kolory, limitowana seria.', 3),

            mk(705, 3, 'Trening techniczny – praca na nogach', 'Zejścia z linii, kąty, balans. Zabierz skakankę.', 4),
            mk(706, 5, 'Poranna grupa – interwały', 'Krótkie, intensywne rundy na worku + tarcze. 06:45–07:45.', 3),
            mk(707, 9, 'Nowy plan rozpisek na wrzesień', 'Więcej terminów dla początkujących i dodatkowy open gym.', 2),
            mk(708, 14, 'Trening tarczowy 1:1 – zapisy', 'Indywidualne rundy z trenerem. Limit miejsc – rezerwacja na recepcji.', 3),
            mk(709, 20, 'Czwartek: core & mobility', 'Stabilizacja, zakresy i prewencja urazów. 30 min po głównej jednostce.', 3),
            mk(710, 30, 'Sparingowe piątki — zasady', 'Lekko, technicznie, w kaskach. Parujemy pod poziom i wagę.', 2),
            mk(711, 48, 'Dostawa sprzętu', 'Owijki 4 m, ochraniacze na zęby i piszczele – nowe rozmiary.', 3),
            mk(712, 60, 'Weekendowy miniobóz — zapisy', 'Dwie jednostki dziennie + teoria. Nocleg we własnym zakresie.', 5),
            mk(713, 90, 'Dzień otwarty', 'Przyprowadź znajomego – pierwsze wejście gratis. Intro do boksu.', 4),
            mk(714, 140, 'Wymiana mat na sali', 'Krótka przerwa techniczna — wieczorne treningi bez zmian.', 2),
            mk(715, 200, 'Nowe godziny otwarcia', 'Klub czynny od 7:00 do 22:00 w dni powszednie.', 3),
            mk(716, 260, 'Wideo-analiza walk', 'Omówienie nagrań i błędów – weź zeszyt na notatki.', 3),
            mk(717, 320, 'Fizjoterapeuta na miejscu', 'Konsultacje po treningu — zapisy w recepcji.', 2),
            mk(718, 380, 'Galeria zdjęć klubowych', 'Nowe foty z treningów i sparingów dostępne online.', 6),
            mk(719, 440, 'Ankieta dla klubowiczów', 'Daj znać, jakie godziny i formaty treningów Ci pasują.', 2),
            mk(720, 500, 'Grupa dzieci — start zapisów', 'Zajęcia ogólnorozwojowe z elementami boksu. 8–12 lat.', 4),
        ];


        return of(mock).pipe(
            delay(120),
            map(items => items.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()))
        );
    }

    getLatest(limit = 3): Observable<NewsItem[]> {
        return this.getAll().pipe(map(items => items.slice(0, limit)));
    }

    /** Stabilne, proste źródło obrazów bez CORB/302. */
    private imagesSet(seed: number, count: number): string[] {
        const n = Math.max(1, count);
        return Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/${seed + i}/1200/800`);
    }
}
