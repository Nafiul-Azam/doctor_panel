import { useEffect, useMemo, useState } from "react";
import { BellOff, MessageSquareMore } from "lucide-react";
import GlassCard from "../components/common/GlassCard";
import ChatWindow from "../components/messages/ChatWindow";
import ConversationList from "../components/messages/ConversationList";
import { chatMessages, conversations } from "../data/mockData";

const INBOX_TOGGLE_KEY = "doctorInboxEnabled";

const DoctorMessagesPage = () => {
  const [activeId, setActiveId] = useState(conversations[0]?.id || null);
  const [composerText, setComposerText] = useState("");
  const [showListMobile, setShowListMobile] = useState(true);
  const [inboxEnabled, setInboxEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = window.localStorage.getItem(INBOX_TOGGLE_KEY);
    if (stored === null) return true;
    return stored === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(INBOX_TOGGLE_KEY, String(inboxEnabled));
  }, [inboxEnabled]);

  const unreadCount = useMemo(
    () => conversations.reduce((total, item) => total + item.unread, 0),
    [],
  );

  const activeConversation = useMemo(
    () =>
      inboxEnabled ? conversations.find((item) => item.id === activeId) : null,
    [activeId, inboxEnabled],
  );
  const activeMessages = inboxEnabled ? chatMessages[activeId] || [] : [];

  const handleSelectConversation = (id) => {
    if (!inboxEnabled) return;
    setActiveId(id);
    setShowListMobile(false);
  };

  return (
    <section className="messages-page">
      <GlassCard className="messages-topbar">
        <div className="messages-topbar-left">
          <h3>Messages Center</h3>
          <p>
            {inboxEnabled
              ? `${unreadCount} unread messages across patient and assistant inbox.`
              : "Inbox paused. Incoming conversations are hidden."}
          </p>
        </div>

        <button
          type="button"
          className={`inbox-toggle ${inboxEnabled ? "on" : "off"}`}
          onClick={() => {
            setInboxEnabled((prev) => !prev);
            setShowListMobile(true);
          }}
        >
          <span className="inbox-toggle-switch">
            <span className="inbox-toggle-track" />
            <span className="inbox-toggle-thumb" />
          </span>
          <span className="inbox-toggle-meta">
            <strong>Messages</strong>
            <small>{inboxEnabled ? "ON" : "OFF"}</small>
          </span>
        </button>
      </GlassCard>

      {!inboxEnabled ? (
        <GlassCard className="inbox-off-card">
          <BellOff size={26} />
          <h3>Inbox is currently off</h3>
          <p>
            Message visibility is disabled. Turn Inbox ON to see who messaged
            you and resume chat.
          </p>
        </GlassCard>
      ) : (
        <section className="message-layout upgraded">
          <div
            className={`message-left ${showListMobile ? "visible-mobile" : ""}`}
          >
            <ConversationList
              items={conversations}
              activeId={activeId}
              onSelect={handleSelectConversation}
            />
          </div>
          <div
            className={`message-right ${showListMobile ? "" : "visible-mobile"}`}
          >
            <ChatWindow
              conversation={activeConversation}
              messages={activeMessages}
              composerValue={composerText}
              onComposerChange={setComposerText}
              onBack={() => setShowListMobile(true)}
              inboxEnabled={inboxEnabled}
            />
          </div>
        </section>
      )}

      <div className="messages-hint-row">
        <MessageSquareMore size={16} />
        <span>
          Tip: Use Inbox OFF when you want no interruption during active
          consultation.
        </span>
      </div>
    </section>
  );
};

export default DoctorMessagesPage;
