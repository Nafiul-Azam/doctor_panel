import GlassCard from "../common/GlassCard";
import IconButton from "../common/IconButton";
import { MonitorCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ form, onChange }) => {
  const navigate = useNavigate();

  return (
    <GlassCard className="edit-profile-form">
      <div className="section-mini-head">
        <h3>Edit Profile</h3>
        <p className="profile-edit-hint">
          Update consultation and chamber details
        </p>
      </div>
      <div className="profile-form-grid">
        <label>
          Full Name
          <input
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </label>
        <label>
          Department
          <input
            value={form.department}
            onChange={(e) => onChange("department", e.target.value)}
          />
        </label>
        <label>
          Specialization
          <input
            value={form.specialization}
            onChange={(e) => onChange("specialization", e.target.value)}
          />
        </label>
        <label>
          Consultation Hours
          <input
            value={form.consultationHours}
            onChange={(e) => onChange("consultationHours", e.target.value)}
          />
        </label>
        <label>
          Session Start
          <input
            type="time"
            value={form.sessionStart}
            onChange={(e) => onChange("sessionStart", e.target.value)}
          />
        </label>
        <label>
          Session End
          <input
            type="time"
            value={form.sessionEnd}
            onChange={(e) => onChange("sessionEnd", e.target.value)}
          />
        </label>
        <label>
          Consultation Mode
          <select
            value={form.mode}
            onChange={(e) => onChange("mode", e.target.value)}
          >
            <option value="In-person">In-person</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Online">Online</option>
          </select>
        </label>
      </div>
      <div className="profile-form-actions">
        <IconButton label="Change Profile Photo" variant="ghost" />
        <IconButton label="Update Chamber Time" variant="ghost" />
        <IconButton
          icon={MonitorCog}
          label="Doctor Panel Setting"
          variant="ghost"
          onClick={() => navigate("/doctor/panel-settings")}
        />
        <IconButton label="Save Changes" />
      </div>
    </GlassCard>
  );
};

export default EditProfileForm;
