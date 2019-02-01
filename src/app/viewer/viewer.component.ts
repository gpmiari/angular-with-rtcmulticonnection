import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as RTCMultiConnection from 'rtcmulticonnection/dist/RTCMultiConnection';
import * as $ from 'jquery/dist/jquery.min';

const source = interval(5000);

@Component({
  selector: 'gmp-viewer',
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit, OnDestroy {

  roomId: string;

  connection;

  subscription: Subscription;

  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      this.roomId = params.roomId;
      this.connection = new RTCMultiConnection();

      this.connection.socketURL = environment.socketio;

      this.connection.session = {
        audio: true,
        video: true,
        oneway: true,
        broadcast: false
      };

      this.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
      };

      this.connection.onstream = event => {
        if (event.type === 'remote') {
          $('#videos-container').append(event.mediaElement);
          $(`#${event.streamid}`).attr('autoplay', true);
          $(`#${event.streamid}`).attr('playsinline', true);
          $(`#${event.streamid}`).attr('volume', 0);
          $(`#${event.streamid}`).prop('muted', true)
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

      this.connection.onUserStatusChanged = event => {
        console.info(event.userid, event.status);
      };

      this.subscription = source.subscribe(() => {
        this.connection.checkPresence(this.roomId, (isRoomExist, roomId) => {
          console.log(roomId);
          if (!isRoomExist) {
            return;
          }
          this.connection.join(roomId);
          try {
            this.subscription.unsubscribe();
          } catch (e) {
          }
          return;
        });
      });
    });
  }

  ngOnDestroy(): void {
    try {
      this.subscription.unsubscribe();
    } catch (e) {
    }
  }

}