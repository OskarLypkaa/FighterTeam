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
