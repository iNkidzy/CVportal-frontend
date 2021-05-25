import { Component, OnInit } from '@angular/core';
import {CvService} from './shared/cv.service';
import {FormControl} from '@angular/forms';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Cv} from './shared/cv.model';
import {CreateCvDto} from './shared/create-cv.dto';
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
    skills: '',
    experience: ''
  }]
  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvsArray = this.cvService.getAllCvs()
  }


/*
  this.cvService.listenForCvs()
.subscribe( cv => {
  this.cvs.push(cv);
});
this.cvService.getAllCvs().pipe(take(1)).subscribe(cvs => {
  this.cvs = cvs;
});

 */
}
