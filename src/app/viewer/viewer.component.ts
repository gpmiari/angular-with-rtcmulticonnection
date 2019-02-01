import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

import * as RTCMultiConnection from 'rtcmulticonnection';

declare var $: any;

@Component({
  selector: 'gmp-viewer',
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit {

  roomId: string;

  connection = new RTCMultiConnection();

  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.roomId = params.roomId;
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
        if (event.type === 'remote') {
          $('#videos-container').append(event.mediaElement);
          $(`#${event.streamid}`).attr('autoplay', true);
          $(`#${event.streamid}`).attr('playsinline', true);
          $(`#${event.streamid}`).attr('muted', true);
          $(`#${event.streamid}`).attr('srcObject', event.stream);
          $(`#${event.streamid}`).removeAttr('controls');
        }
      };
  
      this.connection.join(this.roomId);
      
    });
  }

}
