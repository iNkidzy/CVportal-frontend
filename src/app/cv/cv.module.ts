import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv.component';
import { CvCreateComponent } from './cv-create/cv-create.component';


@NgModule({
  declarations: [
    CvComponent,
    CvCreateComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule
  ]
})
export class CvModule { }
