import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {CreateCvDto} from './create-cv.dto';
import {CvDto} from './cv.dto';


@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor() {}


  getAllCvs(): Array<CvDto> {
    // get CV data from the browser's local storage
    const data = localStorage.getItem("dataSource");
    // check if it has nullish value (Json.Parse gives errors if there is a possibility for the value to be null)
    // also we use a Ternary operator ( ? :  (if else))
    const returnData = data != null ? JSON.parse(data) : "empty"
    console.log(returnData)
    // return the not null data
    return returnData
  }
}
