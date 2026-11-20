import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

import RTCMultiConnection from 'rtcmulticonnection/dist/RTCMultiConnection';
import $ from 'jquery';

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
        $(`#${event.streamid}`).prop('muted', true) 
        $(`#${event.streamid}`).attr('volume', 0);
        $(`#${event.streamid}`).attr('srcObject', event.stream);
        $(`#${event.streamid}`).removeAttr('controls');

        $(`#${event.streamid}`).click(() => {
          if ($(`#${event.streamid}`).prop('muted')) {
            $(`#${event.streamid}`).prop('muted', false);
          } else {
            $(`#${event.streamid}`).prop('muted', true);
          }
        });
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
