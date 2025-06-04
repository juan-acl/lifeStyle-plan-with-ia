import { useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import CreateChatServices from "./services/createChat.services";

function App() {
  const servicesChat = new CreateChatServices();
  const [response, setResponse] = useState("");
  const [text, setText] = useState("");

  const initializeChat = async () => {
    try {
      if (!text) return;
      const responseChat = await servicesChat.createChat({
        model: import.meta.env.VITE_MODEL_LM_ESTUDIO,
        messages: [
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.2,
      });
      setResponse(responseChat?.choices[0]?.message?.content);
    } catch (error) {
      console.log("error en la peticion", error);
    }
  };

  return (
    <>
      <h1>LifeStyle Planner</h1>
      <p className="read-the-docs">{response}</p>
      <Input text={text} setText={setText} />
      <button onClick={initializeChat} disabled={!text}>
        Enviar
      </button>
    </>
  );
}

export default App;
