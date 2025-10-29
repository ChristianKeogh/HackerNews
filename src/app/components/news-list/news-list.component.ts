import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FeedService } from '../../../service/current-feed.service';
import { HackerNewsPublicService } from '../../../service/hackernews-api.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'news-list',
  imports: [CardComponent, MatButtonModule, MatPaginatorModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent {
  private hackerNewsApiService = inject(HackerNewsPublicService);
  private feedService = inject(FeedService);

  public readonly pageSize = 25;
  public currentPage = signal<number>(0);
  public allPostIds = signal<number[]>([]);

  private feedChangeEffect = effect(() => {
    this.feedService.currentFeed();
    this.currentPage.set(0);
    this.fetchPosts();
  });

  public fetchPosts(): void {
    const feed = this.feedService.currentFeed();
    this.hackerNewsApiService.getPostsFromFeed(feed).subscribe((ids) => {
      this.allPostIds.set(ids);
    });
  }

  public displayedPosts = computed(() => {
    const ids = this.allPostIds();
    const start = this.currentPage() * this.pageSize;
    const end = start + this.pageSize;
    return ids.slice(start, end);
  });

  public onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
  }
}
