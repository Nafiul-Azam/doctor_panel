import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", to }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => {
        if (to) {
          navigate(to);
          return;
        }
        navigate(-1);
      }}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
