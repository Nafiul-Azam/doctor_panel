import { Stethoscope } from "lucide-react";
import { useState } from "react";

const PrescriptionHeader = ({ details }) => {
  const [meta, setMeta] = useState({
    patientName: details.patientName,
    date: details.visitDate,
    age: String(details.age),
    gender: details.gender,
    weight: "",
    diagnosis: details.complaint,
  });

  const updateMeta = (key, value) => {
    setMeta((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="prescription-paper-head">
      <div className="paper-top-strip">
        <div>
          <h2>{details.doctorNameBn || details.doctorName}</h2>
          <p className="paper-top-dept">
            {details.hospitalNameBn || details.department}
          </p>
          <p className="paper-top-detail">
            {details.doctorTitleBn || details.department}
          </p>
          <p className="paper-top-detail">{details.hospitalNameEn}</p>
          <p className="paper-top-detail">
            {details.doctorNameEn || details.doctorName}
          </p>
          <p className="paper-top-detail">
            {details.doctorTitleEn || details.department}
          </p>
          <p className="paper-top-detail">{details.designationEn || ""}</p>
        </div>
        <span className="paper-icon-wrap">
          <Stethoscope size={24} />
        </span>
      </div>

      <div className="paper-meta-lines">
        <label>
          Patient Name:
          <input
            value={meta.patientName}
            onChange={(e) => updateMeta("patientName", e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            value={meta.date}
            onChange={(e) => updateMeta("date", e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            value={meta.age}
            onChange={(e) => updateMeta("age", e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            value={meta.gender}
            onChange={(e) => updateMeta("gender", e.target.value)}
          />
        </label>
        <label>
          Weight:
          <input
            value={meta.weight}
            onChange={(e) => updateMeta("weight", e.target.value)}
            placeholder="kg"
          />
        </label>
        <label className="diagnosis-line">
          Diagnosis:
          <input
            value={meta.diagnosis}
            onChange={(e) => updateMeta("diagnosis", e.target.value)}
          />
        </label>
      </div>

      {details.assistantNote ? (
        <blockquote className="assistant-note-bar">
          Assistant Note: {details.assistantNote}
        </blockquote>
      ) : null}
    </div>
  );
};

export default PrescriptionHeader;
