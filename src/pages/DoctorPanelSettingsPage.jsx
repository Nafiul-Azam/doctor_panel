import { Link } from "react-router-dom";
import {
  BellRing,
  LayoutDashboard,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import BackButton from "../components/common/BackButton";
import GlassCard from "../components/common/GlassCard";

const DoctorPanelSettingsPage = () => {
  return (
    <section className="page-grid settings-page">
      <BackButton label="Back to Profile" to="/doctor/profile" />

      <GlassCard className="settings-hero-card">
        <p className="welcome-eyebrow">Panel Settings</p>
        <h2>Doctor Panel Configuration</h2>
        <p>
          Customize privacy, notifications, and workflow behavior for your
          doctor panel environment.
        </p>
        <div className="settings-hero-actions">
          <Link className="icon-btn ghost" to="/doctor/open-settings">
            <SlidersHorizontal size={16} />
            <span>Open Settings</span>
          </Link>
          <Link className="icon-btn ghost" to="/doctor/messages">
            <BellRing size={16} />
            <span>Go to Messages</span>
          </Link>
        </div>
      </GlassCard>

      <div className="dashboard-split">
        <GlassCard className="settings-feature-card">
          <ShieldCheck size={18} />
          <h3>Privacy Controls</h3>
          <p>
            Choose what patient data is visible on screen during consultation.
          </p>
        </GlassCard>

        <GlassCard className="settings-feature-card">
          <BellRing size={18} />
          <h3>Notification Preferences</h3>
          <p>Enable urgent-only alerts and reduce distraction during visits.</p>
        </GlassCard>

        <GlassCard className="settings-feature-card">
          <LayoutDashboard size={18} />
          <h3>Panel Experience</h3>
          <p>
            Refine panel behavior for desktop and mobile workflow consistency.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default DoctorPanelSettingsPage;
