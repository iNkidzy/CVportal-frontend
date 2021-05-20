import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv.component';
import { CvCreateComponent } from './cv-create/cv-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    CvComponent,
    CvCreateComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonModule,
  ]
})
export class CvModule { }
