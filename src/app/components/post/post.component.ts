import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HackerNewsPublicService } from '../../../service/hackernews-api.service';
import { HackerNewsPost } from '../../models/app.models';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CommentComponent, TimeAgoPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private route = inject(ActivatedRoute);
  public service = inject(HackerNewsPublicService);
  public rawFiles$!: Observable<HackerNewsPost>;

  public ngOnInit() {
    this.rawFiles$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('item');
        return this.service.getPost(Number(id));
      })
    );
  }
}
