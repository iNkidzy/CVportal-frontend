import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client.model';
import {ChatMessage} from './shared/chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');
  nickNameFC = new FormControl('');
  messages: ChatMessage[] = [];
  unsubscribe$ = new Subject(); // unsubscribes the subscription
  nickname: string | undefined;
  clients$: Observable<ChatClient[]> | undefined;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => {
        console.log('listens for messages');
        this.messages.push(message);
    });

    this.chatService.getAllMessages()
      .pipe(
        take(1)
      )
      .subscribe(message => {
        console.log('gets all messages');
        this.messages = message;
      });
    this.chatService.connect();
  }
  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.chatService.disconnect();
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
  }

  sendNickname(): void {
    if (this.nickNameFC.value){
    this.nickname = this.nickNameFC.value;
    this.chatService.sendNickname(this.nickNameFC.value);
    }
  }
}
