import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { NewsItem } from './news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
    /** LOKALNE ZDJĘCIA: assets/images/mocked/1.jpg ... 20.jpg */
    private readonly MOCK_PATH = 'assets/images/mocked';
    private readonly MOCK_COUNT = 20;     // <— masz 1..20
    private readonly MOCK_EXT = 'jpg';  // zmień jeśli masz .webp/.png

    getAll(): Observable<NewsItem[]> {
        const now = Date.now();

        const mk = (
            id: number,
            hoursAgo: number,
            title: string,
            description: string,
            imgCount = 5
        ): NewsItem => ({
            id,
            title,
            description,
            publishedAt: new Date(now - hoursAgo * 3_600_000),
            images: this.imagesSet(id, imgCount), // wyłącznie lokalne assets
        });

        const mock: NewsItem[] = [
            mk(901, 2, 'Gala Sparingowa – edycja letnia',
                `Wejście na ring dla wszystkich zaawansowanych: 3×2 min, kontrolowane tempo, sędziowanie szkoleniowe.
Ważenie od 18:00, odprawa bezpieczeństwa 18:30, pierwsze wywołania 19:00. Obowiązkowe: kask, ochraniacz na zęby,
koszulka klubowa. Gośćmi będą trenerzy z partnerskich klubów – po rundach wspólne omówienie i analiza nagrań.
Liczba miejsc ograniczona – zapisy w recepcji do piątku.`, 6),

            mk(902, 6, 'Seminarium Muay Thai z trenerem z Bangkoku',
                `Intensywne 3 godziny: praca w klinczu, łokcie z wejścia, low-kick w kontrze oraz schematy kombinacji
pod sędziowanie IFMA. Część I – technika i zadania na tarczy, Część II – gry zadaniowe i lekkie sparingi.
Wymagane: nagolenniki, łokcie na miękko, rękawice 14–16 oz. Po seminarium Q&A i wspólne zdjęcia.`, 5),

            mk(903, 12, 'Turniej BJJ (No-Gi) – białe i niebieskie pasy',
                `Formuła IBJJF, kategorie do 76 / 82 / 88 / 94 / 100+ kg, czas walk 5 min. Parter od startu, bez dźwigni
na kręgosłup; heel hook niedozwolony w tych dywizjach. Rejestracja do środy 23:59. Dla zwycięzców: vouchery
na sprzęt i darmowe wejściówki na obóz techniczny.`, 4),

            mk(904, 20, 'Obóz techniczny – boks i footwork',
                `Cztery jednostki dziennie: poranny bieg i mobilność, technika bokserska (wejście/wyjście z dystansu,
kąty ataku, balans), popołudniowe gry zadaniowe i wieczorna analiza wideo. Grupy według stażu, kamera na ringu
aktywnie pracuje – każdy dostaje feedback z nagrań.`, 5),

            mk(905, 28, 'Gościnny trener: zapasy pod MMA',
                `Pozycje przy siatce, zejścia single/double leg z setupem z jab-cross, kontrola w półgardzie i ground-and-pound
na tarczy. Zajęcia w kaskach i z rękawicami 7–10 oz na chwyt. Ostatnie 30 minut – scenariusze 50/50 przy siatce.`, 4),

            mk(906, 36, 'Wieczór otwarty – wprowadzenie do boksu',
                `Trening dla nowych osób: garda, poruszanie, podstawowe ciosy prosto oraz proste tarczowanie.
Na koniec krótka sesja na worku (interwał 6×30/30). Sprzęt dostępny na miejscu, obowiązkowo ręcznik i woda.`, 3),

            mk(907, 48, 'Sparing Drill Night – MMA',
                `Rundy 5×3 min, każda z konkretnym celem: 1) jab + zejście w biodra, 2) kontrola przy siatce,
3) wyjścia spod dosiadu, 4) half-guard przepychanie, 5) open mat. Tempo: techniczne 60–70%.
Ochraniacze obowiązkowe.`, 5),

            mk(908, 60, 'Warsztat tarczowania – jak prowadzić rundę',
                `Dla asystentów i osób chcących lepiej trzymać tarcze: rytm, komendy, bezpieczeństwo i progresje.
Przechodzimy od pojedynczych ciosów do akcentów, dołączamy pracę nóg i zejścia z linii, kończymy stretch/mobility.`, 3),

            mk(909, 80, 'Test sprawności – wejścia do grupy zaawansowanej',
                `Beep test, skakanka 3×3, combo techniczne na tarczy, 2×2 min zadaniowego sparingu i krótki test wiedzy taktycznej.
Wyniki publikujemy indywidualnie do 48 h.`, 3),

            mk(910, 120, 'Gościnne rundy – zaprzyjaźnione kluby',
                `Otwarte sparingi międzyklubowe w boksie i K-1. Ringi 2, maty 2 – rotacja co 2 minuty, lżejsze tempo.
Parowanie po poziomie i wadze. Prosimy o koszulki klubowe dla łatwiejszej organizacji.`, 6),

            mk(911, 160, 'Mini-liga początkujących (boks)',
                `Cykl 3 spotkań w miesiącu – punkty za aktywność, balans i czystość ciosów. Sędziowanie szkoleniowe,
feedback po każdej rundzie. Nagrody techniczne: „najlepsza garda”, „najlepsza praca nóg”.`, 4),

            mk(912, 220, 'Seminarium: low-kick w praktyce K-1',
                `Ustawienie biodra, ścięcie zewnętrzne i wewnętrzne, praca na twardej tarczy, kontrataki po blokach.
Do tego kontrola dystansu na półdystansie i praca na rękawicy trenera.`, 4),

            mk(913, 300, 'Open mat / Open gym – weekend',
                `Luźna sala: runda na worku, tarcze, technika w parach, mobilność. Trener dyżurny do dyspozycji.
Dobre miejsce na nadrobienie jednostek z planu.`, 3),
        ];

        return of(mock).pipe(
            delay(120),
            map(items => items.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()))
        );
    }

    getLatest(limit = 3): Observable<NewsItem[]> {
        return this.getAll().pipe(map(items => items.slice(0, limit)));
    }

    /** Deterministyczny „losowy” wybór z 1..MOCK_COUNT, żeby UI nie migało przy każdym renderze. */
    private imagesSet(seed: number, count: number): string[] {
        const n = Math.max(1, count);
        const total = Math.max(1, this.MOCK_COUNT);

        // szybki PRNG z seedem (mulberry32)
        const rnd = this.mulberry32(seed);

        const picked: number[] = [];
        const used = new Set<number>();

        // Unikalne dopóki mamy pulę, potem ewentualnie dublujemy
        while (picked.length < n && used.size < total) {
            const idx = (Math.floor(rnd() * total) + 1); // 1..total
            if (!used.has(idx)) {
                used.add(idx);
                picked.push(idx);
            }
        }
        while (picked.length < n) {
            const idx = (Math.floor(rnd() * total) + 1);
            picked.push(idx);
        }

        return picked.map(i => `${this.MOCK_PATH}/${i}.${this.MOCK_EXT}`);
    }

    /** Mulberry32 – szybki RNG z seedem */
    private mulberry32(a: number) {
        return function () {
            let t = (a += 0x6D2B79F5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
}
