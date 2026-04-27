import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;
    const hasInAppHistory =
      typeof historyIndex === "number" && historyIndex > 0;

    if (hasInAppHistory) {
      navigate(-1);
      return;
    }

    if (to) {
      navigate(to);
      return;
    }

    navigate("/doctor/dashboard");
  };

  return (
    <button type="button" className="back-btn" onClick={handleBack}>
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
