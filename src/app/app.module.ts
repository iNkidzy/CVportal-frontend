import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from './shared/shared.module';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {ChatState} from './chat/state/chat.state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {CvModule} from './cv/cv.module';


// Delete this and .forRoot(config) later
// const config: SocketIoConfig = {url: 'http://localhost:3000', options: {} };
// const configChatBackend: SocketIoConfig = {url: 'http://localhost:3100', options: {} };

@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({url: environment.cvchatBackend, options: {} });
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SharedModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [SocketChat],
  bootstrap: [AppComponent]
})
export class AppModule { }
