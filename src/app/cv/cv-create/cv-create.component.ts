import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['./cv-create.component.scss']
})
export class CvCreateComponent implements OnInit {
  CVForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    work: new FormControl(''),
    skill: new FormControl(''),
    image: new FormControl(''),
    video: new FormControl(''),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('hello');
  }
}
