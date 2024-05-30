import { useEffect, useState } from "react";
import { sendMsg, connect } from "../api";
import ChatHistory from "../components/ChatHistory";

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const send = () => {
    sendMsg("hello");
  };

  useEffect(() => {
    connect((message: MessageEvent) => {
      setChatHistory((prev) => {
        return [...prev, message.data];
      });
    });
  });

  return (
    <>
      <p>Chat</p>
      <ChatHistory chatHistory={chatHistory} />
      <button onClick={send}>Hit</button>
    </>
  );
};

export default Chat;
