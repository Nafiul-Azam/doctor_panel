import { Link } from "react-router-dom";
import GlassCard from "../common/GlassCard";

const QuickActionCard = ({ action }) => {
  const Icon = action.icon;

  return (
    <Link to={action.path} className="quick-action-link">
      <GlassCard className="quick-action-card">
        <Icon size={18} />
        <strong>{action.title}</strong>
      </GlassCard>
    </Link>
  );
};

export default QuickActionCard;
