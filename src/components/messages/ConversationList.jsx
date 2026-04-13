import GlassCard from "../common/GlassCard";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ items, activeId, onSelect }) => {
  return (
    <GlassCard className="conversation-list">
      <div className="conversation-list-head">
        <div>
          <h3>Conversations</h3>
          <p>Patient and assistant threads</p>
        </div>
        <span className="inbox-count-chip">{items.length}</span>
      </div>
      <div className="conversation-stack">
        {items.map((item) => (
          <ConversationItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </GlassCard>
  );
};

export default ConversationList;
