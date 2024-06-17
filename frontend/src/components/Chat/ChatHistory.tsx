type ChatHistoryProps = {
  chatHistory: string[];
};

const ChatHistory = (props: ChatHistoryProps) => {
  const messages = props.chatHistory.map((msg: string, index: number) => (
    <p key={index}>{msg}</p>
  ));

  return (
    <div className="card bg-base-200 my-4">
      <div className="card-body">
        <div className="card-title">
          <h2>Chat History</h2>
        </div>
        {messages}
      </div>
    </div>
  );
};

export default ChatHistory;
