import { Link } from "react-router-dom";
import GlassCard from "../common/GlassCard";
import StatusPill from "../common/StatusPill";

const ForwardedCasesCard = ({ cases }) => {
  return (
    <GlassCard>
      <div className="section-mini-head">
        <h3>Assistant Forwarded Cases</h3>
        <Link to="/doctor/patients" className="text-link">
          View all
        </Link>
      </div>
      <div className="forwarded-list">
        {cases.map((item) => (
          <Link
            key={item.id}
            to={`/doctor/patients/${item.patientId}`}
            className="forwarded-item-link"
          >
            <article className="forwarded-item">
              <div>
                <h4>{item.name}</h4>
                <p>{item.summary}</p>
                <small>{item.assistantNote}</small>
              </div>
              <StatusPill
                status={item.priority === "Urgent" ? "Urgent" : "Forwarded"}
              />
            </article>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
};

export default ForwardedCasesCard;
