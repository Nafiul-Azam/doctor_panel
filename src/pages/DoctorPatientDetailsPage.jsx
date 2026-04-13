import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import ConsultationNotesForm from "../components/prescription/ConsultationNotesForm";
import MedicineEntryTable from "../components/prescription/MedicineEntryTable";
import PrescriptionActions from "../components/prescription/PrescriptionActions";
import PrescriptionHeader from "../components/prescription/PrescriptionHeader";
import { patientDetailsTemplate, patients } from "../data/mockData";

const initialNotes = {
  symptoms: "",
  observations: "",
  diagnosis: "",
  advice: "",
  testRecommendation: "",
  notes: "",
  followUpDate: "",
};

const DoctorPatientDetailsPage = () => {
  const { id } = useParams();

  const details = useMemo(() => {
    const found = patients.find((patient) => patient.id === id);
    if (!found) return patientDetailsTemplate;

    return {
      ...patientDetailsTemplate,
      patientName: found.name,
      patientId: found.id,
      age: found.age,
      complaint: found.complaint,
      assistantNote:
        found.assistantNote || patientDetailsTemplate.assistantNote,
    };
  }, [id]);

  const [notes, setNotes] = useState(initialNotes);
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", frequency: "", duration: "" },
  ]);

  const updateNote = (key, value) =>
    setNotes((prev) => ({ ...prev, [key]: value }));

  const addMedicineRow = () =>
    setMedicines((prev) => [
      ...prev,
      { name: "", dose: "", frequency: "", duration: "" },
    ]);

  const updateMedicine = (index, key, value) => {
    setMedicines((prev) =>
      prev.map((row, current) => {
        if (index !== current) return row;
        return { ...row, [key]: value };
      }),
    );
  };

  return (
    <section className="page-grid clinical-page">
      <BackButton label="Back to Patient List" to="/doctor/patients" />
      <div className="clinical-sheet-shell">
        <PrescriptionHeader key={details.patientId} details={details} />
        <ConsultationNotesForm values={notes} onChange={updateNote} />
        <MedicineEntryTable
          medicines={medicines}
          onAddRow={addMedicineRow}
          onUpdate={updateMedicine}
        />
        <div className="clinical-sheet-footer">
          <span>CLINIC NAME</span>
          <p>24 Dummy Street Area • +12-345 678 9012</p>
        </div>
      </div>
      <PrescriptionActions />
    </section>
  );
};

export default DoctorPatientDetailsPage;
