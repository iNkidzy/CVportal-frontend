import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cvs', loadChildren: () => import('./cv/cv.module').then(m => m.CvModule) },
  { path: 'chats', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
