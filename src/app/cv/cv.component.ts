import { Component, OnInit } from '@angular/core';
import {CvService} from './shared/cv.service';
import {CvDto} from './shared/cv.dto';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  cvsArray: Array<CvDto> = [{
    name: '',
    description: '',
    education: '',
    contact: '',
    experience: ''
  }]
  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvsArray = this.cvService.getAllCvs()
  }

}
