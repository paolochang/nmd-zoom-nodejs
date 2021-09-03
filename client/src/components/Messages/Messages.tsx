import React from "react";
import { IMessage } from "../../types";
import Message from "./Message/Message";
import "./Messages.css";

interface IMessagesComponent {
  name: string;
  messages: IMessage[];
}

const Messages: React.FC<IMessagesComponent> = ({ name, messages }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </div>
);

export default Messages;
