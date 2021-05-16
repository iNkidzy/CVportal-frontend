import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

// Delete this and .forRoot(config) later
// const config: SocketIoConfig = {url: 'http://localhost:3000', options: {} };
// const configChatBackend: SocketIoConfig = {url: 'http://localhost:3100', options: {} };

@Injectable()
export class SocketCV extends Socket {
  constructor() {
    super({url: 'http://localhost:3000', options: {} });
  }
}
@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({url: 'http://localhost:3100', options: {} });
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
  ],
  providers: [SocketCV, SocketChat],
  bootstrap: [AppComponent]
})
export class AppModule { }
