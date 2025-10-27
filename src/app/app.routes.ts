import { Routes } from '@angular/router';
import { NewsList } from './components/news-list/news-list';
import { PostComponent } from './components/post/post';

export const routes: Routes = [
  {
    path: '',
    component: NewsList,
  },
  {
    path: 'post/:item',
    component: PostComponent,
  },
];
