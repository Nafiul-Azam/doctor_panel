import { useEffect, useState } from "react";
import { Bell, BellOff, Settings2 } from "lucide-react";
import BackButton from "../components/common/BackButton";
import GlassCard from "../components/common/GlassCard";

const INBOX_TOGGLE_KEY = "doctorInboxEnabled";

const DoctorOpenSettingsPage = () => {
  const [inboxEnabled, setInboxEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = window.localStorage.getItem(INBOX_TOGGLE_KEY);
    if (stored === null) return true;
    return stored === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(INBOX_TOGGLE_KEY, String(inboxEnabled));
  }, [inboxEnabled]);

  return (
    <section className="page-grid settings-page">
      <BackButton label="Back to Panel Settings" to="/doctor/panel-settings" />

      <GlassCard className="open-settings-card">
        <div className="settings-open-head">
          <div>
            <p className="welcome-eyebrow">Open Settings</p>
            <h2>Inbox Visibility Control</h2>
            <p>
              Toggle message inbox visibility. When OFF, doctor cannot see who
              sent messages until it is turned ON again.
            </p>
          </div>
          <Settings2 size={22} />
        </div>

        <div className="open-settings-toggle-row">
          <button
            type="button"
            className={`inbox-toggle ${inboxEnabled ? "on" : "off"}`}
            onClick={() => setInboxEnabled((prev) => !prev)}
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

          <div className={`open-settings-state ${inboxEnabled ? "on" : "off"}`}>
            {inboxEnabled ? <Bell size={16} /> : <BellOff size={16} />}
            <span>
              {inboxEnabled
                ? "Inbox is active. Message list is visible."
                : "Inbox is hidden. Sender list is blocked."}
            </span>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default DoctorOpenSettingsPage;
