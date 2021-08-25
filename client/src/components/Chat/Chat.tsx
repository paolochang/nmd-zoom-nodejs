import React, { useEffect, useState } from "react";
import socket from "../../socket";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { IMessage } from "../../types";
import "./Chat.css";

interface IChat {
  room: string;
  name: string;
}

const Chat: React.FC<IChat> = ({ room, name }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessageHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (message) {
      socket.emit("message", message, () => {
        setMessages([...messages, { user: name, text: message }]);
        setMessage("");
      });
    }
  };

  return (
    <div className="chat-container">
      <Messages name={name} messages={messages} />
      <Input
        setMessage={setMessage}
        sendMessage={sendMessageHandler}
        message={message}
      />
    </div>
  );
};

export default Chat;
