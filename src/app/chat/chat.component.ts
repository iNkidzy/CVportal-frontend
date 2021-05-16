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
  clients$: Observable<ChatClient[]> | undefined;
  chatClient: ChatClient | undefined;
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
    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome =>
      {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client;
        // use NGXS later rn its simple state using Singleton Service
      });
    if (this.chatService.chatClient){
      this.chatService.sendNickname(this.chatService.chatClient.nickname);
    }

  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage(): void {
    console.log(this.message.value);
    this.chatService.sendMessage(this.message.value);
  }
  sendNickname(): void {
    if (this.nickNameFC.value){
      this.chatService.sendNickname(this.nickNameFC.value);
    }
  }
}
