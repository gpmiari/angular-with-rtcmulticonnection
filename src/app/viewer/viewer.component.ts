import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { StorageService } from '../core/storage/storage.service';

declare var $: any;
declare var RTCMultiConnection: any;

@Component({
  selector: 'gmp-viewer',
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit {

  roomId: string;

  connection = new RTCMultiConnection();

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.connection = new RTCMultiConnection();

    this.connection.socketURL = environment.socketio;

    this.connection.session = {
      audio: false,
      video: true
    };

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: true
    };

    this.connection.onstream = function (event) {
      $('#videos-container').append(event.mediaElement);
    };

    this.connection.join(this.storageService.getRoomId);
  }

}
