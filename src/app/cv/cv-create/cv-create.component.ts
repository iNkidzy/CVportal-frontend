import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateCvDto} from '../shared/create-cv.dto';
import {CvService} from '../shared/cv.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Router} from '@angular/router';
export interface Skill {
  name: string;
}
@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['./cv-create.component.scss']
})
export class CvCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: Skill[] = [
    {name: 'Teamwork'},
    {name: 'Communication'},
    {name: 'Problem Solving'},
  ];
  CVForm = this.fb.group({
    name: new FormControl(''),
    description: new FormControl(''),
    education: new FormControl(''),
    experience: new FormControl(''),
    skills: new FormControl(''),
    contact: new FormControl(''),
    image: new FormControl(''),
    video: new FormControl(''),
  });

  cvCreate: CreateCvDto | undefined;
  constructor(private fb: FormBuilder, private cvService: CvService, private router: Router) {
  }

  ngOnInit(): void {
    //Not used, because we get data directly from local storage
    this.cvService.listenForCreate()
      .subscribe(cvCreated => {
        this.cvCreate = cvCreated;
      });
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
      this.cvService.create(cvDto);
      localStorage.setItem('dataSource', JSON.stringify([cvDto]));
    }
  }

  Back(): void {  //Change this to something better later
      console.log("Form Submitted!");
      this.router.navigateByUrl('http://localhost:4200/cvs/create/').then(res => {
        console.log(res)
      });
  }

  //ChipEvent
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push({name: value});
    }
    console.log(event);
    // Clear the input value
    event.input.value = '';
  }

  remove(skill: Skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

}

