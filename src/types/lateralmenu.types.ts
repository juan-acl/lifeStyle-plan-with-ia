import { Chat } from "./chats.types";

export interface PropsLateralmenu {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  clear?: () => void;
  className?: string;
}
