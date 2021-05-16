import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {SocketChat} from '../../app.module';
import {ChatClient} from './chat-client.model';
import {ChatMessage} from './chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: SocketChat) { }

  sendMessage(msg: string): void { // sends a message
    this.socket.emit('message', msg);
  }

  listenForMessages(): Observable<ChatMessage> { // listens for new messages, update ChatMessage makes it so we know who the sender was
    return this.socket
      .fromEvent<ChatMessage>('newMessage');
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
  disconnect(): void {
    this.socket.disconnect();
  }

  connect(): void {
    this.socket.connect();
  }
}
