import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { HackerNewsPublicService } from '../../../service/hackernewsapi';

@Component({
  selector: 'app-post',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class PostComponent {
  private route = inject(ActivatedRoute);
  public service = inject(HackerNewsPublicService);
  rawFiles$!: Observable<any>;

  ngOnInit() {
    this.rawFiles$ = this.route.paramMap.pipe(
      switchMap((params: any) => {
        const id = params.get('item');
        return this.service.getPost(id);
      }),
      tap((data) => console.log('Fetched post:', data))
    );
  }
}
