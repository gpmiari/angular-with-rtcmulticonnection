import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  uuid = 'cb7f8d78-f8f6-4326-9046-22b2d639959d';

  constructor() { }

  ngOnInit() {
  }

}
