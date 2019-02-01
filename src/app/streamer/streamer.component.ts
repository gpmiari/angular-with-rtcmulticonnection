import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import * as RTCMultiConnection from 'rtcmulticonnection';

declare var $: any;

@Component({
  selector: 'gmp-streamer',
  templateUrl: './streamer.component.html'
})
export class StreamerComponent implements OnInit {

  connection = null;

  hasShowStart = false;

  constructor(private activedRoute: ActivatedRoute) { }

  roomId: string;

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.roomId = params.roomId;
    });
  }

  onCreateShow() {

    this.hasShowStart = true;

    this.connection = new RTCMultiConnection();

    this.connection.socketURL = environment.socketio;

    this.connection.extra.isAudioMuted = true;

    console.log(this.connection)

    this.connection.session = {
      audio: true,
      video: true,
      oneway: true
    };

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false
    };

    this.connection.onstream = event => {
      if (event.type === 'local') {
        $('#videos-container').append(event.mediaElement);
        $(`#${event.streamid}`).attr('autoplay', true);
        $(`#${event.streamid}`).attr('playsinline', true);
        $(`#${event.streamid}`).attr('muted', true);
        $(`#${event.streamid}`).attr('volume', 0);
        $(`#${event.streamid}`).attr('srcObject', event.stream);
        $(`#${event.streamid}`).removeAttr('controls');
      }
    };
    this.connection.open(this.roomId);
  }


  onStopShow() {
    this.hasShowStart = false;
    this.connection.closeSocket();
    $('#videos-container').empty();
  }

}
