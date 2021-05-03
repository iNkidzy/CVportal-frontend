import { Component, OnInit } from '@angular/core';
import {CvService} from './shared/cv.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
cv = new FormControl('');
cvs: string[] = [];
  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.listenForCvs()
      .subscribe( cv => {
        this.cvs.push(cv);
      });
  }

}
