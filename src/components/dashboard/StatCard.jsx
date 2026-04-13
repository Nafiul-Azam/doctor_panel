import GlassCard from "../common/GlassCard";

const StatCard = ({ title, value, trend, icon: Icon }) => {
  return (
    <GlassCard className="stat-card">
      <div className="stat-row">
        <div>
          <p>{title}</p>
          <h3>{value}</h3>
        </div>
        {Icon ? <Icon size={18} /> : null}
      </div>
      <small>{trend}</small>
    </GlassCard>
  );
};

export default StatCard;
