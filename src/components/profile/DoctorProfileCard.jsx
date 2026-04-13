import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../common/GlassCard";
import IconButton from "../common/IconButton";

const DoctorProfileCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <GlassCard className="doctor-profile-card">
      <img src={doctor.photo} alt={doctor.name} />
      <div className="doctor-profile-main">
        <h2>{doctor.name}</h2>
        <p>{doctor.specialization}</p>
        <small>
          {doctor.id} • {doctor.department}
        </small>
        <div className="doctor-profile-inline-meta">
          <span>{doctor.qualification}</span>
          <span>{doctor.chamber}</span>
        </div>
      </div>
      <div className="doctor-profile-actions">
        <span className="availability-chip">Available</span>
        <IconButton
          icon={SlidersHorizontal}
          label="Panel Settings"
          variant="ghost"
          onClick={() => navigate("/doctor/panel-settings")}
        />
      </div>
    </GlassCard>
  );
};

export default DoctorProfileCard;
