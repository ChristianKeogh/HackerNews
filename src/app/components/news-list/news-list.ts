import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { HackerNewsPublicService } from '../../../service/hackernewsapi';
import { CardComponent } from '../card/card';

@Component({
  selector: 'news-list',
  imports: [CardComponent, AsyncPipe],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss',
})
export class NewsList {
  private service = inject(HackerNewsPublicService);
  private pageSize = 25;
  public currentPage$ = new BehaviorSubject<number>(0);
  private rawFiles$ = this.service.getTopPosts();

  public displayedFiles$ = combineLatest([this.rawFiles$, this.currentPage$]).pipe(
    map(([posts, page]) => {
      const start = page * this.pageSize;
      const end = start + this.pageSize;
      return posts.slice(start, end);
    })
  );

  public showMore() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  public showPrevious() {
    if (this.currentPage$.value > 0) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
}
