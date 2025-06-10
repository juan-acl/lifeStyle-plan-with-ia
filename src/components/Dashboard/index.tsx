import "./dashboard.css";
import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Chat, Message } from "../../types/chats.types";
import { formatLLMTextToHTML, thinkReplacement } from "../../utils/think";
import CreateChatServices from "../../services/createChat.services";
import SessionStorageServices from "../../services/sesionStorage.services";
import { useLoader } from "../../hooks/useLoader";
import Loader from "../Loader";
import { v4 } from "uuid";
import { ChatMessageList } from "../Chat/List/list";
import { useNavigate, useParams } from "react-router-dom";

function Dashboard() {
  const { id } = useParams();
  const servicesChat = new CreateChatServices();
  const sessionStorageServices = SessionStorageServices.getInstance();
  const { loading, hideLoader, showLoader } = useLoader();
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const generateTitle = async (text: string) => {
    const prompt = `Genera un título corto, claro y descriptivo para esta conversación. No uses comillas  ni puntos al final. El título debe reflejar el tema principal de la conversación. Aquí está el texto: ${text}`;
    const responseChat = await servicesChat.createChat({
      model: import.meta.env.VITE_MODEL_LM_ESTUDIO,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 512,
      stream: false,
    });

    const reponse = responseChat?.choices[0]?.message?.content ?? "";
    return thinkReplacement(reponse);
  };

  useEffect(() => {
    if (!id) return;
    const chat = sessionStorageServices.getChatById(id);
    if (chat) {
      setMessages(
        chat.messages.map((msg) => ({
          role: msg.role,
          content: formatLLMTextToHTML(msg.content),
        }))
      );
    } else {
      console.warn("No chat found with the given ID");
    }
  }, [id]);

  const initializeChat = async () => {
    if (!text) return;

    try {
      showLoader();
      const [responseChat, title] = await Promise.all([
        servicesChat.createChat({
          model: import.meta.env.VITE_MODEL_LM_ESTUDIO,
          messages: [{ role: "user", content: text }],
          temperature: 0.5,
        }),
        generateTitle(text),
      ]);

      const assistantResponse = thinkReplacement(
        responseChat?.choices[0]?.message?.content ?? ""
      );

      const newMessages: Message[] = [
        { role: "user", content: text },
        { role: "assistant", content: assistantResponse },
      ];

      const chat: Chat = {
        id: v4(),
        title,
        created_at: new Date().toISOString(),
        user_id: "1",
        messages: [...newMessages],
      };

      sessionStorageServices.setNewChat(chat);
      navigate(`/c/${chat.id}`);
      const history = sessionStorageServices.getChatById(chat.id);
      setMessages(history?.messages || []);
    } catch (error) {
      console.log("error en la petición", error);
    } finally {
      setText("");
      hideLoader();
    }
  };

  const conversation = async () => {
    if (!text) return;
    showLoader();

    try {
      const responseChat = await servicesChat.createChat({
        model: import.meta.env.VITE_MODEL_LM_ESTUDIO,
        messages: [{ role: "user", content: text }],
        temperature: 0.5,
      });

      const assistantResponse = thinkReplacement(
        responseChat?.choices[0]?.message?.content ?? ""
      );

      const newMessages: Message[] = [
        { role: "user", content: text },
        { role: "assistant", content: assistantResponse },
      ];

      setMessages(
        sessionStorageServices.setmessagesById(id, newMessages).map((item) => ({
          role: item.role,
          content: formatLLMTextToHTML(item.content),
        }))
      );
      setText("");
    } catch (error) {
      console.log("error en la petición", error);
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="chat-wrapper">
        <div className="chat-main">
          {id ? (
            <ChatMessageList messages={messages || []} />
          ) : (
            <h2>
              Welcome to the Chat Dashboard
              <br />
              LifeStyle Planner
            </h2>
          )}
        </div>
        <div className="chat-input">
          <Input
            text={text}
            setText={setText}
            onClick={id ? conversation : initializeChat}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
