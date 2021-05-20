import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateCvDto} from '../shared/create-cv.dto';
import {CvService} from '../shared/cv.service';

@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['./cv-create.component.scss']
})
export class CvCreateComponent implements OnInit {
  CVForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    education: new FormControl(''),
    skill: new FormControl(''),
    image: new FormControl(''),
    video: new FormControl(''),
  });

  cvCreate: CreateCvDto | undefined;
  constructor(private fb: FormBuilder, private cvService: CvService) {
  }

  ngOnInit(): void {
    this.cvService.listenForCreate()
      .subscribe(cvCreated => {
        this.CVForm.reset();
        this.cvCreate = cvCreated;
      });
  }
  createCv(): void{
    const cvDto: CreateCvDto = this.CVForm.value;
    this.cvService.create(cvDto);
  }
}
