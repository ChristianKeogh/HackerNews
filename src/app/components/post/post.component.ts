import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HackerNewsPublicService } from '../../../service/hackernews-api.service';
import { HackerNewsPost } from '../../models/app.models';

@Component({
  selector: 'app-post',
  imports: [AsyncPipe, JsonPipe],
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
