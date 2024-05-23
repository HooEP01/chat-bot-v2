import { useEffect, useState } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";
import ChatHistory from "./components/ChatHistory";
import Header from "./components/Header";
import Faq from "./components/Faq";

function App() {
  const [chatHistory, setChatHistory] = useState<string[]>([])

  // connect();

  const send = () => {
    console.log("hello");
    sendMsg("hello");
  };

  useEffect(() => {
    connect((msg: any) => {
      console.log("New Message")
      setChatHistory((prev) => [...prev, msg])
      console.log(msg);
    });
  });

  return (
    <>
      <div className="App">
        <Faq/>
        <Header />
        <ChatHistory chatHistory={chatHistory} />
        <button onClick={send}>Hit</button>
      </div>
    </>
  );
}

export default App;
