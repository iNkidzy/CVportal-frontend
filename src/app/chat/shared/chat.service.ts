import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {SocketChat} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: SocketChat) { }

  sendMessage(msg: string): void { // sends a message
    this.socket.emit('message', msg);
  }

  listenForMessages(): Observable<string> { // listens for new messages
    return this.socket
      .fromEvent<string>('newMessage');
  }

  getAllMessages(): Observable<string[]> { // stores data on memory backend
    return this.socket
      .fromEvent<string[]>('allMessages');
  }

  sendNickname(nickname: string): void {
    this.socket.emit('nickname', nickname);
  }
  listenForClients(): Observable<string[]> { // listens for clients
    return this.socket
      .fromEvent<string[]>('clients');
  }
  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }
}
