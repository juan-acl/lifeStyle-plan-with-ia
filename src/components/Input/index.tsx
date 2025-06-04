import { InputProps } from "../../types/input.types";

export const Input = ({ text, setText }: InputProps) => {
  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      type="text"
      placeholder="Escribe tu mensaje"
      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
