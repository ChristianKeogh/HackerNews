import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsHomeComponent } from './components/news-home/news-home.component';

@Component({
  selector: 'app-root',
  imports: [NewsHomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('HackerNews');
}
