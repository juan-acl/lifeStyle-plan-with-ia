import { useEffect, useRef } from "react";
import { ChatMessageItem } from "../Item/item";
import { Message } from "../../../types/chats.types";

interface Props {
  messages: Message[];
}

export const ChatMessageList = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      isInitialRender.current = false;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <ChatMessageItem
          key={index + "000"}
          role={msg.role}
          content={msg.content}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
