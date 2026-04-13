import { Paperclip, Send, Video } from "lucide-react";

const MessageComposer = ({ value, onChange }) => {
  return (
    <div className="message-composer">
      <button type="button" className="composer-icon">
        <Paperclip size={16} />
      </button>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="button" className="composer-icon">
        <Video size={16} />
      </button>
      <button type="button" className="composer-send">
        <Send size={16} />
      </button>
    </div>
  );
};

export default MessageComposer;
