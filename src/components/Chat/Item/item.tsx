import { Message } from "../../../types/chats.types";
import "./chatMessage.css";

export const ChatMessageItem = ({ content, role }: Message) => {
  return (
    <div className={`chat-item ${role}`}>
      <div
        className="chat-bubble"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
