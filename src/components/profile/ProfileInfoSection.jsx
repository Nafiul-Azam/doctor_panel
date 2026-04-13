import GlassCard from "../common/GlassCard";

const ProfileInfoSection = ({ title, rows }) => {
  return (
    <GlassCard>
      <h3>{title}</h3>
      <div className="profile-info-grid">
        {rows.map((row) => (
          <div key={row.label}>
            <span>{row.label}</span>
            <p>{row.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ProfileInfoSection;
