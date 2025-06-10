import { Chat, Message } from "../types/chats.types";

class SessionStorageServices {
  private static instance: SessionStorageServices;
  private readonly key: string;
  private listeners: ((chats: Chat[]) => void)[] = [];

  private constructor(key: string) {
    this.key = key;
  }

  public static getInstance(): SessionStorageServices {
    if (!SessionStorageServices.instance) {
      SessionStorageServices.instance = new SessionStorageServices("chats");
    }
    return SessionStorageServices.instance;
  }

  getItem(): Chat[] {
    const current = sessionStorage.getItem(this.key);
    return current ? JSON.parse(current) : [];
  }

  getChatById(id: string): Chat | undefined {
    const chats = this.getItem();
    return chats.find((chat) => chat.id === id);
  }

  setmessagesById(id: string, messages: Message[]): Message[] {
    const current = this.getItem();
    const updated = current.map((chat) => {
      if (chat.id === id) {
        return { ...chat, messages: [...chat.messages, ...messages] };
      }
      return chat;
    });
    sessionStorage.setItem(this.key, JSON.stringify(updated));
    this.notify(updated);
    return updated.find((chat) => chat.id === id)?.messages || [];
  }

  setNewChat(chat: Chat) {
    const current = this.getItem();
    const updated = [...current, chat];
    sessionStorage.setItem(this.key, JSON.stringify(updated));
    this.notify(updated);
  }

  clear(): void {
    sessionStorage.removeItem(this.key);
    this.notify([]);
  }

  subscribe(listener: (chats: Chat[]) => void) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (chats: Chat[]) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notify(chats: Chat[]) {
    this.listeners.forEach((l) => l(chats));
  }
}

export default SessionStorageServices;
