import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ChatClient} from '../shared/chat-client.model';
import {ChatClientLoggedIn, ListenForClients, LoadClientFromStorage, StopListeningForClients, UpdateClients} from './chat.actions';
import {state} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ChatService} from '../shared/chat.service';

export interface ChatStateModel {
  chatClients: ChatClient[];  // defining the types in state like a schema
  // later add properties from welcome dto
  loggedInClient: ChatClient | undefined;

}
@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    chatClients: [],
    loggedInClient: undefined,
      }
})
@Injectable()
export class ChatState { // Important! Every state u create add to app.module
  private clientUnsub: Subscription | undefined;
  constructor(private chatService: ChatService) {
  }

  //Selectors

  @Selector()
  static loggedInClient(state: ChatStateModel): ChatClient | undefined {
    return state.loggedInClient;
  }
  @Selector()  // Gives only the chatClients , like quarries in db
  static clients(state: ChatStateModel): ChatClient[] {
    return state.chatClients;
  }
  @Selector()
  static clientIds(state: ChatStateModel): string[] {
    return state.chatClients.map(c => c.id);
  }

  @Selector()
  static clientsOnline(state: ChatStateModel): number {
    return state.chatClients.length;
  }
/*
  @Action(GetClients)   // Action Geting clients
  getClients(ctx: StateContext<ChatStateModel>): void { // Context gives access to our state and change that state
    const state = ctx.getState(); // immutable = cannot make changes directly to state, cuz it's readonly
    const oldClients = [...state.chatClients];
    oldClients.push({id: '22', nickname: 'dd'})
    const newState: ChatStateModel = {
      ...state, // reseting values
      chatClients: [...oldClients]
    };
    ctx.setState(newState); // seting a new state
  } */

  @Action(ListenForClients)
  getClients(ctx: StateContext<ChatStateModel>): void {
    this.clientUnsub = this.chatService.listenForClients()
      .subscribe(clients => {
        ctx.dispatch(new UpdateClients(clients));
      });
     }

  @Action(UpdateClients)
  updateClients(ctx: StateContext<ChatStateModel>, uc: UpdateClients): void {
    const state = ctx.getState();
    const newState: ChatStateModel = {
      ...state,
      chatClients: uc.clients
    };
        ctx.setState(newState);
  }
  @Action(StopListeningForClients)
  stopListeningForClients(ctx: StateContext<ChatStateModel>):void {
    if ( this.clientUnsub) {
      this.clientUnsub.unsubscribe();
    }
  }

  @Action(ChatClientLoggedIn)
  chatClientLoggedIn(ctx: StateContext<ChatStateModel>,clientLoggedInAction:ChatClientLoggedIn):void {
    const state = ctx.getState();
    const newState: ChatStateModel = {
      ...state,
      loggedInClient:clientLoggedInAction.client
    };
    ctx.setState(newState);
  }

  @Action(LoadClientFromStorage)
  loadClientFromStorage(ctx:StateContext<ChatStateModel>):void {
    const state = ctx.getState();
    const client = state.loggedInClient;
    if(client) {
      this.chatService.joinChat({
        id: client.id,
        nickname: client.nickname
      });
    }
  }
}
