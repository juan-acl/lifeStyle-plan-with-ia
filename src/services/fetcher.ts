import { ChatRequest } from "../types/chats.types";

class Fetcher {
  private readonly url: string;
  private readonly headers: Record<string, string>;

  constructor(url: string, headers: Record<string, string>) {
    this.url = url;
    this.headers = headers;
  }

  async post(body: ChatRequest) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response.json();
  }
}

export default Fetcher;
