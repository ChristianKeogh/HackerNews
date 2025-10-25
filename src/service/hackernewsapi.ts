import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsPublicService {
  private http: HttpClient = inject(HttpClient);

  public getTopStories(): Observable<any> {
    return this.http.get(`https://hacker-news.firebaseio.com/v0/topstories.json`);
  }
}
