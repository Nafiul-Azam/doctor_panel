import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import ConsultationNotesForm from "../components/prescription/ConsultationNotesForm";
import PrescriptionActions from "../components/prescription/PrescriptionActions";
import { patientDetailsTemplate, patients } from "../data/mockData";

const patientPhoneById = {
  "P-1001": "+880 1711-100001",
  "P-1002": "+880 1711-100002",
  "P-1003": "+880 1711-100003",
  "P-1004": "+880 1711-100004",
  "P-1005": "+880 1711-100005",
  "P-1006": "+880 1711-100006",
};

const createInitialNotes = (details) => ({
  patientName: details.patientName || "",
  patientId: details.patientId || "",
  mobile: details.mobile || "",
  age: details.age ? String(details.age) : "",
  weight: "",
  date: details.visitDate || "",
  chiefComplaint: details.complaint || "",
  history: "",
  onExamination: "",
  diagnosis: details.complaint || "",
  advice: "",
  notes: "",
  finalAdvice: "",
  followUpDate: "",
  medicines: [{ name: "", dose: "1+0+1", duration: "7 din", instruction: "" }],
});

const emptyDetails = {
  ...patientDetailsTemplate,
  patientName: "",
  patientId: "",
  mobile: "",
  age: "",
  complaint: "",
};

const DoctorPatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const details = useMemo(() => {
    const found = patients.find((patient) => patient.id === id);
    if (!found) return emptyDetails;

    return {
      ...patientDetailsTemplate,
      patientName: found.name,
      patientId: found.id,
      mobile: patientPhoneById[found.id] || "",
      age: found.age,
      complaint: found.complaint,
      assistantNote:
        found.assistantNote || patientDetailsTemplate.assistantNote,
    };
  }, [id]);

  const [notes, setNotes] = useState(() => createInitialNotes(details));

  useEffect(() => {
    setNotes(createInitialNotes(details));
  }, [details]);

  const updateNote = (key, value) =>
    setNotes((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="page-grid clinical-page">
      <BackButton label="Back to Patient Record" to="/doctor/patient-records" />
      <div className="clinical-sheet-shell">
        <ConsultationNotesForm values={notes} onChange={updateNote} />
      </div>
      <PrescriptionActions
        onSaveDraft={() =>
          navigate(`/doctor/patients/${details.patientId}/action/save-draft`)
        }
        onPreview={() => {
          window.localStorage.setItem(
            `preview-rx-${details.patientId}`,
            JSON.stringify(notes),
          );
          navigate(`/doctor/patients/${details.patientId}/action/preview`);
        }}
        onPrint={() =>
          navigate(`/doctor/patients/${details.patientId}/action/print`)
        }
        onUploadDocument={() =>
          navigate(`/doctor/patients/${details.patientId}/action/upload`)
        }
        onGeneratePrescription={() =>
          navigate(`/doctor/patients/${details.patientId}/action/generate`)
        }
        onMarkComplete={() =>
          navigate(`/doctor/patients/${details.patientId}/action/complete`)
        }
      />
    </section>
  );
};

export default DoctorPatientDetailsPage;
