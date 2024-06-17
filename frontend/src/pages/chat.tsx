import { useEffect, useState } from "react";
import { sendMsg, connect } from "../api";
import ChatHistory from "../components/Chat/ChatHistory";

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
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>Chat Message</li>
        </ul>
      </div>

      {/* Title */}
      <p className="text-2xl font-semibold mb-4">Chat Message</p>

      <ChatHistory chatHistory={chatHistory} />
      <button onClick={send} className="btn btn-primary">Send Message</button>
    </>
  );
};

export default Chat;
