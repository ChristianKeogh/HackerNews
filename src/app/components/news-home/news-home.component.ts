import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HackerNewsPublicService } from '../../../service/hackernewsapi';

@Component({
  selector: 'news-home',
  imports: [AsyncPipe],
  templateUrl: './news-home.component.html',
  styleUrl: './news-home.component.scss',
})
export class NewsHomeComponent implements OnInit {
  public service = inject(HackerNewsPublicService);
  public rawFiles$ = this.service.getTopStories();

  ngOnInit() {}
}
