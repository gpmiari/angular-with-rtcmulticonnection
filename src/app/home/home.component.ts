import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  uuid = 'cb7f8d78-f8f6-4326-9046-22b2d639959d';

  constructor() { }

  ngOnInit() {
  }

}
