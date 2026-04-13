import { Bell } from "lucide-react";
import DashboardSectionHeader from "../components/dashboard/DashboardSectionHeader";
import ForwardedCasesCard from "../components/dashboard/ForwardedCasesCard";
import NextPatientCard from "../components/dashboard/NextPatientCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import StatCard from "../components/dashboard/StatCard";
import GlassCard from "../components/common/GlassCard";
import {
  dashboardHighlights,
  dashboardStats,
  doctorInfo,
  forwardedCases,
  notifications,
  patients,
  quickActions,
  todaySession,
} from "../data/mockData";

const DoctorDashboardPage = () => {
  const nextPatient =
    patients.find((item) => item.status === "Next") || patients[0];

  return (
    <section className="page-grid page-dashboard">
      <div className="dashboard-hero-grid">
        <GlassCard className="welcome-card welcome-card-redesign">
          <p className="welcome-eyebrow">Welcome back</p>
          <div className="doctor-identity-row">
            <img src={doctorInfo.photo} alt={doctorInfo.name} />
            <div>
              <h2>{doctorInfo.name}</h2>
              <p>
                {doctorInfo.specialization} • {doctorInfo.department}
              </p>
            </div>
          </div>
          <p className="welcome-description">
            Maintain a smooth queue, prioritize urgent cases, and stay on top of
            assistant-forwarded summaries.
          </p>
          <div className="session-inline">
            <span>{todaySession.chamber}</span>
            <span>{todaySession.slot}</span>
            <span>{todaySession.queueStatus}</span>
          </div>
        </GlassCard>

        <GlassCard className="session-focus-card">
          <p className="welcome-eyebrow">Today&apos;s Session</p>
          <h3>{todaySession.title}</h3>
          <div className="session-focus-list">
            <article>
              <span>Chamber</span>
              <strong>{todaySession.chamber}</strong>
            </article>
            <article>
              <span>Time Slot</span>
              <strong>{todaySession.slot}</strong>
            </article>
            <article>
              <span>Assistant</span>
              <strong>{todaySession.assistant}</strong>
            </article>
          </div>
          <p className="session-status-chip">{todaySession.queueStatus}</p>
        </GlassCard>
      </div>

      <div className="stat-grid dashboard-stats-grid">
        {dashboardStats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="dashboard-section-block">
        <DashboardSectionHeader
          title="Queue Focus"
          subtitle="High-priority queue updates at a glance"
        />
        <div className="dashboard-split">
          <NextPatientCard patient={nextPatient} />
          <ForwardedCasesCard cases={forwardedCases} />
        </div>
      </div>

      <div className="dashboard-split">
        <GlassCard className="notification-card">
          <div className="section-mini-head">
            <h3>Recent Notifications</h3>
            <Bell size={16} />
          </div>
          <div className="notification-stack">
            {notifications.map((item) => (
              <p key={item} className="notification-item">
                {item}
              </p>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="activity-summary-card">
          <h3>Activity Summary</h3>
          <div className="highlight-grid">
            {dashboardHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label}>
                  <Icon size={16} />
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="dashboard-section-block">
        <DashboardSectionHeader
          title="Quick Actions"
          subtitle="Jump into frequent tasks instantly"
        />
        <div className="quick-action-grid dashboard-actions-grid">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboardPage;
