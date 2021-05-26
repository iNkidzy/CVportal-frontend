import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateCvDto} from '../shared/create-cv.dto';
import {CvService} from '../shared/cv.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['./cv-create.component.scss']
})
export class CvCreateComponent implements OnInit {
  CVForm = this.fb.group({
    name: new FormControl(''),
    description: new FormControl(''),
    education: new FormControl(''),
    experience: new FormControl(''),
    contact: new FormControl(''),
  });

  cvCreate: CreateCvDto | undefined;
  constructor(private fb: FormBuilder, private cvService: CvService, private router: Router) {
  }

  ngOnInit(): void {
  }
  createCv(): void{
    const cvDto: CreateCvDto = this.CVForm.value;
    this.cvCreate = cvDto;
    // Get existing CVs from Local storage
    let existingCV = localStorage.getItem("dataSource");
    if (existingCV) {
      // Parse the array from the local storage and assign it to a const
      const arr = (JSON.parse(existingCV))
      // Push the incoming form data to the existing array
      arr.push(cvDto)
      // Save the array with the newly added CV to local storage
      localStorage.setItem('dataSource', JSON.stringify(arr));
    } else {
      localStorage.setItem('dataSource', JSON.stringify([cvDto]));
    }
  }

  Back(): void {  //Change this to something better later
      console.log("Form Submitted!");
      this.router.navigateByUrl('http://localhost:4200/cvs/create/').then(res => {
        console.log(res)
      });
  }

}

