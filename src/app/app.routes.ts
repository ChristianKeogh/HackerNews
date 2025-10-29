import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'post/:item',
    component: PostComponent,
  },
];
