import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CreateCvDto} from './create-cv.dto';
import {CvDto} from './cv.dto';
import {SocketCV} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private socketCv: SocketCV) {}

  create(cv: CreateCvDto): void{
    this.socketCv.emit('create-cv', cv);
  }
  listenForCreate(): Observable<CvDto> {
    return this.socketCv.fromEvent<CvDto>('cv-created');
  }
  /*
  listenForCvs(): Observable<string> {
    return this.socketCv
      .fromEvent<string>('cvs');
  }
  getAllCvs(): Observable<string[]>{
    return this.socketCv.fromEvent<string[]>('allCvs');
  }

   */
}
