import { Injectable, signal } from '@angular/core';

export type FeedType = 'top' | 'new' | 'best';

@Injectable({ providedIn: 'root' })
export class FeedService {
  public currentFeed = signal<FeedType>('top');
}
