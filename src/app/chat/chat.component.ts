import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './shared/chat.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, take, takeUntil} from 'rxjs/operators';
import {ChatClient} from './shared/chat-client.model';
import {ChatMessage} from './shared/chat-message.model';
import {JoinChatDto} from './shared/join-chat.dto';
import {ChatState} from './state/chat.state';
import {Select, Store} from '@ngxs/store';
import {ChatClientLoggedIn, ListenForClients, LoadClientFromStorage, StopListeningForClients} from './state/chat.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Select(ChatState.clients) clients$: Observable<ChatClient[]> | undefined;
  @Select(ChatState.clientIds) clientsIds$: Observable<string[]> | undefined;
  @Select(ChatState.loggedInClient) chatClient$: Observable<ChatClient> | undefined;

  messageFC = new FormControl('');
  nickNameFC = new FormControl('');

  messages: ChatMessage[] = [];
  unsubscribe$ = new Subject(); // unsubscribes the subscription
  //clients$: Observable<ChatClient[]> | undefined;
  //chatClient: ChatClient | undefined;
  error$: Observable<string> | undefined;
  clientsTyping: ChatClient[] = [];
  socketId: string | undefined;
  constructor(private store: Store,
              private chatService: ChatService) { }

  ngOnInit(): void {
    // this.clients$ = this.chatService.listenForClients();
    this.store.dispatch(new ListenForClients());
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
      .subscribe(welcome => {
        this.messages = welcome.messages;
        // this.chatClient = welcome.client;
        this.store.dispatch(new ChatClientLoggedIn(welcome.client))
        // use NGXS later rn its simple state using Singleton Service
      });
    this.store.dispatch(new LoadClientFromStorage());
    /*
    if (oldClient){
      this.chatService.joinChat({
        id: oldClient.id, // this.chatService.chatClient
        nickname: oldClient.nickname
      });
    } */
    this.chatService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('id', id);
        this.socketId = id;
      });
    this.chatService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('disconnect id', id);
        this.socketId = id;
      });
  }
    ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new StopListeningForClients());
     }

  sendMessage(): void {
    console.log(this.messageFC.value);
    this.chatService.sendMessage(this.messageFC.value);
    this.messageFC.patchValue('');
  }
  sendNickname(): void {
    if (this.nickNameFC.value) {
      const dto: JoinChatDto = { nickname: this.nickNameFC.value};
      this.chatService.joinChat(dto);
    }
  }
}
