import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, take, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client.model';
import {ChatMessage} from './shared/chat-message.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messageFC = new FormControl('');
  nickNameFC = new FormControl('');
  messages: ChatMessage[] = [];
  unsubscribe$ = new Subject(); // unsubscribes the subscription
  clients$: Observable<ChatClient[]> | undefined;
  chatClient: ChatClient | undefined;
  error$: Observable<string> | undefined;
  clientsTyping: ChatClient[] = [];
  socketId: string | undefined;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.clients$ = this.chatService.listenForClients();
    this.error$ = this.chatService.listenForErrors();
    this.messageFC.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.chatService.sendTyping(value.length > 0);
      });
    this.chatService.listenForMessages()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(message => {
        console.log('listens for messages');
        this.messages.push(message);
      });
    this.chatService.listenForClientTyping() // under listen for msgs maybe
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((chatClient) => {
        if (chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)) {
          this.clientsTyping.push(chatClient);
        } else {
          this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id);
        }
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
    this.chatService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        this.socketId = id;
      });
    this.chatService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        this.socketId = id;
      });

  }
    ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
     }

  sendMessage(): void {
    console.log(this.messageFC.value);
    this.chatService.sendMessage(this.messageFC.value);
    this.messageFC.patchValue('');
  }
  sendNickname(): void {
    if (this.nickNameFC.value) {
      this.chatService.sendNickname(this.nickNameFC.value);
    }
  }
}
