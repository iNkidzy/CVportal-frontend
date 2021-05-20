import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CreateCvDto} from './create-cv.dto';
import {CvDto} from './cv.dto';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private socket: Socket) {}
  create(socket: CreateCvDto): void{
    this.socket.emit('create-cv', socket);
  }
  listenForCreate(): Observable<CvDto> {
    return this.socket.fromEvent<CvDto>('cv-created');
  }
  listenForErrors(): Observable<string> {
    return this.socket.fromEvent<string>('cv-error');
  }
  listenForCvs(): Observable<string> {
    return this.socket
      .fromEvent<string>('cvs');
  }
  getAllCvs(): Observable<string[]>{
    return this.socket.fromEvent<string[]>('allCvs');
  }
}
