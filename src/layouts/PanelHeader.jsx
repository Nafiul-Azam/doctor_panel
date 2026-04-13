import { Bell, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/common/BackButton";

const pathTitleMap = {
  dashboard: "Dashboard",
  patients: "Patients",
  messages: "Messages",
  profile: "Profile",
};

const PanelHeader = () => {
  const { pathname } = useLocation();
  const chunks = pathname.split("/").filter(Boolean);
  const isDetailsPage = chunks[2] && chunks[1] === "patients";

  return (
    <header className="panel-header glass-card">
      <div className="panel-header-main">
        {isDetailsPage ? (
          <BackButton label="Back to Patients" to="/doctor/patients" />
        ) : null}
        <div className="breadcrumb-row">
          {chunks.map((chunk, index) => {
            const key = `${chunk}-${index}`;
            const title = pathTitleMap[chunk] || chunk.toUpperCase();
            return (
              <span key={key} className="crumb-item">
                {index > 0 ? <ChevronRight size={14} /> : null}
                <strong>{title}</strong>
              </span>
            );
          })}
        </div>
      </div>
      <button className="header-alert" type="button">
        <Bell size={16} />
        <span>3</span>
      </button>
    </header>
  );
};

export default PanelHeader;
