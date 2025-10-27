import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HackerNewsPublicService } from '../../../service/hackernewsapi';

@Component({
  selector: 'card',
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent implements OnChanges {
  @Input() post!: string;
  @Input() indexNum!: number;

  private service = inject(HackerNewsPublicService);
  public postData$!: Observable<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && this.post) {
      this.postData$ = this.service
        .getPost(this.post)
        .pipe(tap((x) => console.log('post', x.type)));
    }
  }
}
