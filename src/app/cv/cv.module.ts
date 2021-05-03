import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv.component';
import { CvCreateComponent } from './cv-create/cv-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    CvComponent,
    CvCreateComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class CvModule { }
