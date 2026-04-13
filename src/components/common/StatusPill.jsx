import { statusColors } from "../../data/mockData";

const StatusPill = ({ status }) => {
  const tone = statusColors[status] || "teal";
  return (
    <span className={`status-pill ${tone}`}>
      <i className="status-dot" aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};

export default StatusPill;
