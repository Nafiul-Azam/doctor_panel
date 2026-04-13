import GlassCard from "../common/GlassCard";
import EmptyState from "../common/EmptyState";
import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";

const ChatWindow = ({
  conversation,
  messages,
  composerValue,
  onComposerChange,
  onBack,
  inboxEnabled = true,
}) => {
  if (!inboxEnabled) {
    return (
      <GlassCard className="chat-window inbox-off-chat">
        <EmptyState
          title="Inbox Off"
          subtitle="Turn Inbox ON to view conversations and messages."
        />
      </GlassCard>
    );
  }

  if (!conversation) {
    return (
      <GlassCard className="chat-window">
        <EmptyState
          title="Select a conversation"
          subtitle="Choose a patient or assistant to start messaging."
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard className="chat-window">
      <div className="chat-header">
        {onBack ? (
          <button
            type="button"
            className="back-btn mobile-only"
            onClick={onBack}
          >
            Back
          </button>
        ) : null}
        <div>
          <h3>{conversation.name}</h3>
          <p>{conversation.role}</p>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <MessageComposer value={composerValue} onChange={onComposerChange} />
    </GlassCard>
  );
};

export default ChatWindow;
