import { Link } from "react-router-dom";
import GlassCard from "../common/GlassCard";
import StatusPill from "../common/StatusPill";

const NextPatientCard = ({ patient }) => {
  if (!patient) return null;

  return (
    <Link to={`/doctor/patients/${patient.id}`} className="next-patient-link">
      <GlassCard className="next-patient-card">
        <div className="next-patient-head">
          <h3>Next Serial Patient</h3>
          <StatusPill status={patient.status} />
        </div>
        <h4>{patient.name}</h4>
        <p>{patient.complaint}</p>
        <div className="patient-meta-row">
          <span>{patient.id}</span>
          <span>Serial {patient.serial}</span>
          <span>{patient.timeSlot}</span>
        </div>
        <span className="text-link">Open clinical details</span>
      </GlassCard>
    </Link>
  );
};

export default NextPatientCard;
