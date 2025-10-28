import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsPost } from '../app/models/post.model';
import { FeedType } from './current-feed.service';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsPublicService {
  private http: HttpClient = inject(HttpClient);

  public getPostsFromFeed(feed: FeedType) {
    switch (feed) {
      case 'top':
        return this.getTopPosts();
      case 'new':
        return this.getNewPosts();
      case 'best':
        return this.getBestPosts();
      default:
        return this.getTopPosts();
    }
  }

  public getTopPosts(): Observable<number[]> {
    return this.http.get<number[]>(`https://hacker-news.firebaseio.com/v0/topstories.json`);
  }

  public getNewPosts(): Observable<number[]> {
    return this.http.get<number[]>(`https://hacker-news.firebaseio.com/v0/newstories.json`);
  }

  public getBestPosts(): Observable<number[]> {
    return this.http.get<number[]>(`https://hacker-news.firebaseio.com/v0/beststories.json`);
  }

  public getPost(postNum: number): Observable<any> {
    return this.http.get<HackerNewsPost>(
      `https://hacker-news.firebaseio.com/v0/item/${postNum}.json`
    );
  }
}
