import "../styles/app.css";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { NavBarLateral } from "../components/NavBarLateral";
import SessionStorageServices from "../services/sesionStorage.services";
import { Chat } from "../types/chats.types";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const sessionStorageService = SessionStorageServices.getInstance();

  useEffect(() => {
    setChats(sessionStorageService.getItem());

    const listener = (updatedChats: Chat[]) => {
      setChats(updatedChats);
    };
    sessionStorageService.subscribe(listener);

    return () => {
      sessionStorageService.unsubscribe(listener);
    };
  }, []);

  return (
    <div className="home-container">
      <NavBarLateral
        className="navbar-lateral"
        chats={chats}
        setChats={setChats}
        clear={() => {
          sessionStorageService.clear();
          setChats([]);
          navigate("/");
        }}
      />
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  );
}
