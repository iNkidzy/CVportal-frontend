import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private socket: Socket) {}
  listenForCvs(): Observable<string> {
    return this.socket
      .fromEvent<string>('cvs');
  }
}
