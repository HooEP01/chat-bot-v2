import "./ChatHistory.scss";

const ChatHistory = (props: any) => {
  const messages = props.chatHistory.map((msg: any, index: number) => (
    <p key={index}>{msg.data}</p>
  ));

  return (
    <div className="ChatHistory">
      <h2>Chat History</h2>
      {messages}
    </div>
  );
};

export default ChatHistory;
