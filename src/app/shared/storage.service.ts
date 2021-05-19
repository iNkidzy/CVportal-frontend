import { Injectable } from '@angular/core';
import {ChatClient} from '../chat/shared/chat-client.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
// State Managment saving and loading client from local storage Not Used Anymore
  constructor() {}

  saveChatClient(chatClient: ChatClient): void {
    localStorage.setItem('client', JSON.stringify(chatClient));
  }

  loadChatClient(): ChatClient | undefined {
    const chatClientString = localStorage.getItem('client');
    if (chatClientString) {
      const chatClient: ChatClient = JSON.parse(chatClientString);
      return chatClient;
    }
    return undefined;
    }
  }
