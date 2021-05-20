import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CreateCvDto} from '../shared/create-cv.dto';
import {CvService} from '../shared/cv.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
export interface Fruit {
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
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];
  CVForm = this.fb.group({
    name: new FormControl(''),
    description: new FormControl(''),
    education: new FormControl(''),
    experience: new FormControl(''),
    skills: new FormControl(''),
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
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }
    console.log(event);
    // Clear the input value
    event.input.value = '';
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}

