export interface Chat {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
  messages: Message[];
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  model: string;
  messages: Message[];
  temperature: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}
