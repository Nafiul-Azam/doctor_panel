import { BellRing, Globe, MonitorCog, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../common/GlassCard";
import IconButton from "../common/IconButton";

const DoctorPanelSettingsCard = () => {
  const navigate = useNavigate();

  return (
    <GlassCard className="doctor-panel-settings-card">
      <div className="settings-card-head">
        <div>
          <h3>Doctor Panel Settings</h3>
          <p>Control notification, privacy, and panel behavior preferences.</p>
        </div>
        <IconButton
          icon={MonitorCog}
          label="Open Settings"
          onClick={() => navigate("/doctor/open-settings")}
        />
      </div>

      <div className="settings-quick-grid">
        <article>
          <ShieldCheck size={16} />
          <div>
            <strong>Privacy Mode</strong>
            <p>Mask patient details on shared screens</p>
          </div>
        </article>
        <article>
          <BellRing size={16} />
          <div>
            <strong>Notification Rules</strong>
            <p>Set urgent-only alerts during consultation</p>
          </div>
        </article>
        <article>
          <Globe size={16} />
          <div>
            <strong>Language & Region</strong>
            <p>Choose local format for date and time</p>
          </div>
        </article>
      </div>
    </GlassCard>
  );
};

export default DoctorPanelSettingsCard;
