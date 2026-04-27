import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircle2,
  Eye,
  FileOutput,
  Printer,
  Save,
  UploadCloud,
} from "lucide-react";
import BackButton from "../components/common/BackButton";
import GlassCard from "../components/common/GlassCard";
import ConsultationNotesForm from "../components/prescription/ConsultationNotesForm";
import { patientDetailsTemplate, patients } from "../data/mockData";

const actionConfig = {
  "save-draft": {
    title: "Draft Saved",
    description: "Consultation draft is stored and can be resumed later.",
    icon: Save,
  },
  print: {
    title: "Print Preview",
    description: "Use browser print to generate a hard copy or PDF.",
    icon: Printer,
  },
  upload: {
    title: "Upload Document",
    description: "Attach lab reports or external files to this consultation.",
    icon: UploadCloud,
  },
  preview: {
    title: "Prescription Preview",
    description: "Realistic prescription pad preview.",
    icon: Eye,
  },
  generate: {
    title: "Generate Prescription",
    description: "Prescription draft generated successfully for this patient.",
    icon: FileOutput,
  },
  complete: {
    title: "Consultation Completed",
    description: "Patient consultation has been marked as complete.",
    icon: CheckCircle2,
  },
};

const DoctorPrescriptionActionPage = () => {
  const { id, actionType } = useParams();
  const patient = patients.find((item) => item.id === id);
  const action = actionConfig[actionType] || actionConfig["save-draft"];
  const ActionIcon = action.icon;

  const [uploadedFileName, setUploadedFileName] = useState("");

  const generatedId = useMemo(() => {
    if (!patient || actionType !== "generate") return "";
    return `RX-${patient.id}`;
  }, [actionType, patient]);

  const previewValues = useMemo(() => {
    if (!patient || actionType !== "preview") return null;

    const savedDraft = window.localStorage.getItem(`preview-rx-${patient.id}`);

    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch {
        // Ignore invalid JSON and use fallback preview values.
      }
    }

    return {
      patientName: patient.name,
      age: String(patient.age),
      date: patientDetailsTemplate.visitDate,
      chiefComplaint: patient.complaint,
      diagnosis: patient.complaint,
      medicines: [
        { name: "", dose: "1+0+1", duration: "7 din", instruction: "" },
      ],
      finalAdvice: "",
      followUpDate: "",
    };
  }, [actionType, patient]);

  useEffect(() => {
    if (!patient) return;

    if (actionType === "save-draft") {
      const key = `draft-${patient.id}`;
      const payload = {
        patientId: patient.id,
        patientName: patient.name,
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(key, JSON.stringify(payload));
    }

    if (actionType === "complete") {
      window.localStorage.setItem(
        `completed-${patient.id}`,
        JSON.stringify({ completedAt: new Date().toISOString() }),
      );
    }

    if (actionType === "generate") {
      window.localStorage.setItem(
        `generated-rx-${patient.id}`,
        JSON.stringify({
          prescriptionNo: `RX-${patient.id}`,
          generatedAt: new Date().toISOString(),
        }),
      );
    }
  }, [actionType, patient]);

  const subtitle = useMemo(() => {
    if (!patient) return "Patient not found.";
    return `${patient.name} (${patient.id})`;
  }, [patient]);

  if (!patient) {
    return (
      <section className="page-grid action-page">
        <BackButton label="Back to Patients" to="/doctor/patients" />
        <GlassCard>
          <h3>Patient not found</h3>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="page-grid action-page">
      <BackButton
        label="Back to Prescription Page"
        to={`/doctor/patients/${patient.id}`}
      />

      <GlassCard className="action-result-card">
        <div className="action-result-head">
          <span className="action-icon-wrap">
            <ActionIcon size={20} />
          </span>
          <div>
            <h2>{action.title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>

        <p className="action-result-description">{action.description}</p>

        {actionType === "preview" && previewValues ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#d8ecee] bg-[#f7fdfd] p-2 sm:p-3">
            <ConsultationNotesForm
              values={previewValues}
              onChange={() => {}}
              previewMode
            />
          </div>
        ) : null}

        {actionType === "print" ? (
          <button
            type="button"
            className="icon-btn"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            <span>Open Print Dialog</span>
          </button>
        ) : null}

        {actionType === "upload" ? (
          <label className="upload-file-row">
            <input
              type="file"
              onChange={(e) =>
                setUploadedFileName(e.target.files?.[0]?.name || "")
              }
            />
            <span>{uploadedFileName || "Choose document to upload"}</span>
          </label>
        ) : null}

        {actionType === "generate" && generatedId ? (
          <p className="action-meta-note">Generated ID: {generatedId}</p>
        ) : null}
      </GlassCard>
    </section>
  );
};

export default DoctorPrescriptionActionPage;
