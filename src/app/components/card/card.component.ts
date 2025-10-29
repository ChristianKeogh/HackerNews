import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { HackerNewsPublicService } from '../../../service/hackernews-api.service';
import { HackerNewsPost } from '../../models/app.models';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'card',
  imports: [RouterLink, TimeAgoPipe, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnChanges {
  @Input() post!: number;
  @Input() indexNum!: number;

  private service = inject(HackerNewsPublicService);
  public postData$!: Observable<HackerNewsPost>;

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && this.post) {
      this.postData$ = this.service.getPost(this.post);
    }
  }
}
