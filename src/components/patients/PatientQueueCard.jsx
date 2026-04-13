import { Link } from "react-router-dom";
import GlassCard from "../common/GlassCard";
import PatientStatusBadge from "./PatientStatusBadge";

const PatientQueueCard = ({ patient }) => {
  return (
    <Link to={`/doctor/patients/${patient.id}`} className="patient-link-card">
      <GlassCard className="patient-queue-card">
        <div className="patient-row-top">
          <div>
            <h3>{patient.name}</h3>
            <p>{patient.complaint}</p>
          </div>
          <PatientStatusBadge status={patient.status} />
        </div>

        <div className="patient-meta-grid">
          <span>ID: {patient.id}</span>
          <span>Age: {patient.age}</span>
          <span>Serial: {patient.serial}</span>
          <span>Slot: {patient.timeSlot}</span>
        </div>

        {patient.forwarded ? (
          <div className="forwarded-badge">Forwarded by assistant</div>
        ) : null}
      </GlassCard>
    </Link>
  );
};

export default PatientQueueCard;
