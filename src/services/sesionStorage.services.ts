import { Chat } from "../types/chats.types";

class SessionStorageServices {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  getItem() {
    const current = sessionStorage.getItem(this.key);
    if (!current) return [];
    return JSON.parse(current);
  }

  setItem(value: Chat) {
    const current = this.getItem();
    sessionStorage.setItem(this.key, JSON.stringify([...current, value]));
  }
}

export default SessionStorageServices;
