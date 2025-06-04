import { ChatRequest, ChatResponse } from "../types/chats.types";
import Fetcher from "./fetcher";

class CreateChatServices {
  private readonly fetcher: Fetcher;

  constructor() {
    this.fetcher = new Fetcher(import.meta.env.VITE_LM_ESTUDIO_URL, {
      "Content-Type": "application/json",
      Authorization: "Bearer no-key",
    });
  }

  async createChat(message: ChatRequest): Promise<ChatResponse> {
    const response = await this.fetcher.post(message);
    return response;
  }
}

export default CreateChatServices;
