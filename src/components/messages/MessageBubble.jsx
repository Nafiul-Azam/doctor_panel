const MessageBubble = ({ message }) => {
  return (
    <div
      className={`message-bubble ${message.from === "me" ? "from-me" : "from-other"}`}
    >
      <p>{message.text}</p>
      <small>{message.time}</small>
    </div>
  );
};

export default MessageBubble;
