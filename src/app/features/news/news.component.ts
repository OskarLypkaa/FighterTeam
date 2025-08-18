import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  news = [
    { id: 1, title: 'Nowa grupa początkująca od poniedziałku', content: 'Start o 18:00 – wbijasz, przedstawiasz się trenerowi i jedziesz.', publishedAt: new Date() },
    { id: 2, title: 'Sobotni open gym', content: 'Luźna sala 10:00–12:00. Worki, tarcze, mobilizacja.', publishedAt: new Date(Date.now() - 86400000) }
  ];

}
