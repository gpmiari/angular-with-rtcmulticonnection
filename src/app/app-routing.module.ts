import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StreamerComponent } from './streamer/streamer.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
