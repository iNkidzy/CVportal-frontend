import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CvCreateComponent} from './cv/cv-create/cv-create.component';
import {CvComponent} from './cv/cv.component';

const routes: Routes = [
  {path: '', component: CvComponent},
  { path: 'create', component: CvCreateComponent},
  { path: 'cvs', loadChildren: () => import('./cv/cv.module').then(m => m.CvModule) },
  { path: 'chats', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: '**', redirectTo: 'cvs' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
