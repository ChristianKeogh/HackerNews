import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef, inject, signal } from '@angular/core';
import { HackerNewsPublicService } from '../../../service/hackernews-api.service';
import { HackerNewsPost } from '../../models/app.models';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, forwardRef(() => CommentComponent)],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  @Input() commentId!: number;
  
  private service = inject(HackerNewsPublicService);
  public comment = signal<HackerNewsPost | null>(null);
  public loading = signal<boolean>(true);
  public collapsed = signal<boolean>(false);

  ngOnInit() {
    if (this.commentId) {
      this.service.getPost(this.commentId).subscribe({
        next: (data) => {
          this.comment.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }
}
