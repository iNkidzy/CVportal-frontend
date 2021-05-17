import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {SocketChat} from '../../app.module';
import {ChatClient} from './chat-client.model';
import {ChatMessage} from './chat-message.model';
import {WelcomeDto} from './welcome.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // using the service for a simple management state system rn
  chatClient: ChatClient | undefined;
  constructor(private socket: SocketChat) { }

  sendMessage(msg: string): void { // sends a message
    this.socket.emit('message', msg);
  }

  sendTyping(typing: boolean): void  {
    this.socket.emit('typing', typing);

  }

  listenForMessages(): Observable<ChatMessage> { // listens for new messages, update ChatMessage makes it so we know who the sender was
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
  }
  listenForClientTyping(): Observable<ChatClient> { // listens for welcome package
    return this.socket
      .fromEvent<ChatClient>('clientTyping');
  }

  getAllMessages(): Observable<ChatMessage[]> { // stores data on memory backend
    return this.socket
      .fromEvent<ChatMessage[]>('allMessages');
  }

  sendNickname(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }
  listenForClients(): Observable<ChatClient[]> { // listens for clients
    return this.socket
      .fromEvent<ChatClient[]>('clients');
  }

  listenForWelcome(): Observable<WelcomeDto> { // listens for welcome package
    return this.socket
      .fromEvent<WelcomeDto>('welcome');
  }

  listenForErrors(): Observable<string> { // listens for error msgs
    return this.socket
      .fromEvent<string>('error');
  }




  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map( (value) => {
          return this.socket.ioSocket.id;
        })
      );
  }
  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect').pipe(
        map( () => {
          return this.socket.ioSocket.id;
        })
      );
  }




  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }


}
