import { useState } from "react";
import "./lateralnav.css";
import NewChat from "../../assets/new-chat.svg";
import Open from "../../assets/open.svg";
import { PropsLateralmenu } from "../../types/lateralmenu.types";
import { useNavigate } from "react-router-dom";

export const NavBarLateral = ({
  chats,
  clear,
  className,
}: PropsLateralmenu) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const createNewChat = () => {
    navigate("/");
  };

  const redirectChat = (id: string) => {
    navigate(`/c/${id}`);
  };

  return (
    <div>
      <div className={className}>
        <button
          className="toggle-button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={Open} alt="openicon" />
        </button>

        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <ul className="menu">
            <li onClick={createNewChat}>
              <img src={NewChat} alt="newChaticon" />
              New Chat
            </li>

            {chats.length > 0 && (
              <li onClick={clear}>
                <img src={NewChat} alt="newChaticon" />
                Clear Chats
              </li>
            )}

            <h6 className="title-menu">History ({chats.length})</h6>

            <div className="history-chats">
              {chats.map((item, index) => (
                <li
                  key={item.id + item.created_at + index}
                  onClick={() => redirectChat(item.id)}
                  className="chat-item"
                >
                  {item.title}
                </li>
              ))}
            </div>
          </ul>
        </aside>
      </div>
    </div>
  );
};
