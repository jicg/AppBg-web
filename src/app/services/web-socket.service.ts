import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';

@Injectable()
export class WebSocketService {
  ws: WebSocket;

  constructor() {
  }

  // connect(url: string): Observable<any> {
  //   this.ws = new WebSocket(url);
  //   return new Observable(
  //     observer => {
  //       this.ws.onmessage = (event) => observer.next(event.data);
  //       this.ws.onerror = (event) => observer.error(event);
  //       this.ws.onclose = (event) => observer.complete();
  //     }
  //   );
  // }

  connect(url: string, onopen, onmessage, onerr, onclose) {
    this.ws = new WebSocket(url);
    this.ws.onopen = onopen;
    this.ws.onmessage = onmessage;
    this.ws.onerror = onerr;
    this.ws.onclose = onclose;
  }

  send(msg: any) {
    console.log('---------')
    if (this.ws.readyState === WebSocket.OPEN) {
      console.log('---------')
      this.ws.send(JSON.stringify(msg));
    }
  }
}
