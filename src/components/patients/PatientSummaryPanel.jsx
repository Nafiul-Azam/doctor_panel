import GlassCard from "../common/GlassCard";

const PatientSummaryPanel = ({
  total,
  waiting,
  inProgress,
  completed,
  forwarded,
}) => {
  return (
    <GlassCard className="patient-summary-panel">
      <div>
        <p>Total</p>
        <h4>{total}</h4>
      </div>
      <div>
        <p>Waiting</p>
        <h4>{waiting}</h4>
      </div>
      <div>
        <p>In Progress</p>
        <h4>{inProgress}</h4>
      </div>
      <div>
        <p>Completed</p>
        <h4>{completed}</h4>
      </div>
      <div>
        <p>Forwarded</p>
        <h4>{forwarded}</h4>
      </div>
    </GlassCard>
  );
};

export default PatientSummaryPanel;
