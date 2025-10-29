import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { FeedService } from '../../../service/current-feed.service';

@Component({
  selector: 'navbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, MatButtonToggleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private feedService = inject(FeedService);
  private router = inject(Router);

  private redirectOrSetFeed(feed: 'top' | 'new' | 'best') {
    const url = this.router.url.split('?')[0];

    if (!['/', ''].includes(url)) {
      this.feedService.currentFeed.set(feed);
      this.router.navigate(['/']);
    } else {
      this.feedService.currentFeed.set(feed);
    }
  }

  public onClickTop() {
    this.redirectOrSetFeed('top');
  }

  public onClickNew() {
    this.redirectOrSetFeed('new');
  }

  public onClickBest() {
    this.redirectOrSetFeed('best');
  }
}
