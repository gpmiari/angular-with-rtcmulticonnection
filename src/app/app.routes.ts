import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StreamerComponent } from './streamer/streamer.component';
import { ViewerComponent } from './viewer/viewer.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'streamer/:roomId',
    component: StreamerComponent,
  },
  {
    path: 'viewer/:roomId',
    component: ViewerComponent,
  }
];
