import { InputProps } from "../../types/input.types";
import "./Input.css";
import { KeyboardEvent } from "react";

export const Input = ({ text, setText, onClick = () => {} }: InputProps) => {
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          onKeyDown={handleEnter}
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Pregunta lo que quieras"
          className="input-field"
        />
        <div className="input-actions">
          <button onClick={onClick} disabled={!text} className="send-button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
