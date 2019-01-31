import { Component, OnInit } from '@angular/core';
import { StorageService } from '../core/storage/storage.service';
import { environment } from 'src/environments/environment';

import * as uuid from 'uuid';

import * as RTCMultiConnection from 'rtcmulticonnection';

declare var $: any;
declare var RTCMultiConnection: any;

@Component({
  selector: 'gmp-streamer',
  templateUrl: './streamer.component.html'
})
export class StreamerComponent implements OnInit {

  connection = new RTCMultiConnection();

  hasShowStart = false;

  constructor(private storageService: StorageService) { }

  roomId: string;

  ngOnInit() {
    this.roomId = uuid.v4();
  }

  onCreateShow() {

    this.hasShowStart = true;

    this.connection = new RTCMultiConnection();

    this.connection.socketURL = environment.socketio;

    this.connection.session = {
      audio: true,
      video: true
    };

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };

    this.connection.onstream = function (event) {
      $('#videos-container').append(event.mediaElement);
    };

    this.storageService.setRoomId(this.roomId);

    this.connection.open(this.roomId);
  }

  onStopShow() {
    this.hasShowStart = false;
    this.connection.closeSocket();
    $('#videos-container').empty();
  }

}
