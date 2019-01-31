import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ViewerModule } from './viewer/viewer.module';
import { StreamerModule } from './streamer/streamer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ViewerModule,
    StreamerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
