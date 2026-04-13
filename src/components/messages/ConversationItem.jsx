const ConversationItem = ({ item, active, onClick }) => {
  return (
    <button
      type="button"
      className={`conversation-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="avatar-badge">{item.avatar}</div>
      <div className="conversation-main">
        <div>
          <h4>{item.name}</h4>
          <span>{item.role}</span>
        </div>
        <p>{item.lastMessage}</p>
      </div>
      <div className="conversation-meta">
        <small>{item.time}</small>
        {item.unread > 0 ? <strong>{item.unread}</strong> : null}
      </div>
    </button>
  );
};

export default ConversationItem;
