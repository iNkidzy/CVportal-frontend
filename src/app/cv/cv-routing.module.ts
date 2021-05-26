import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv.component';
import {CvCreateComponent} from './cv-create/cv-create.component';

const routes: Routes = [{ path: '', component: CvComponent },
                        { path: 'cvs', component: CvComponent },
                        { path: 'create', component: CvCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
