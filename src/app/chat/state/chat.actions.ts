import {ChatClient} from '../shared/chat-client.model';

export class ListenForClients {
  static readonly type = '[Chat] Get Clients';
}
export class StopListeningForErrors {
  static readonly type = '[Chat] Stop Listening For Errors';
}
export class UpdateClients {
  constructor(public clients:ChatClient[]) {} //pass data into an action like this
  static readonly type = '[Chat] Update Clients';
}
export class StopListeningForClients {
  static readonly type = '[Chat] Stop Listening For Clients';
}

export class ChatClientLoggedIn {
  constructor(public client:ChatClient) {}
  static readonly type = '[Chat] New ChatClient Logged In';
}
export class LoadClientFromStorage {
  static readonly type = '[Chat] Load ChatClient from Storage';
}
