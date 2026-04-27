import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  FilePenLine,
  FileText,
  PhoneCall,
  Plus,
  Printer,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { patients } from "../../data/mockData";

const patientExtraDetails = {
  "P-1001": {
    phone: "+880 1711-100001",
    gender: "Female",
    bloodGroup: "B+",
    diagnosis: "Migraine",
    history:
      "Recurrent headache for 2 years. Triggered by stress and lack of sleep.",
    lab: "No lab report",
    lastVisit: "13 Apr 2026",
  },
  "P-1002": {
    phone: "+880 1711-100002",
    gender: "Male",
    bloodGroup: "O+",
    diagnosis: "Hypertension",
    history: "Known high blood pressure patient. Regular BP monitoring needed.",
    lab: "BP chart uploaded",
    lastVisit: "13 Apr 2026",
  },
  "P-1003": {
    phone: "+880 1711-100003",
    gender: "Female",
    bloodGroup: "A+",
    diagnosis: "Fever with chest discomfort",
    history:
      "Persistent fever for 5 days. Assistant marked vitals as unstable.",
    lab: "CBC + CXR suggested",
    lastVisit: "13 Apr 2026",
  },
  "P-1004": {
    phone: "+880 1711-100004",
    gender: "Male",
    bloodGroup: "AB+",
    diagnosis: "Gastritis",
    history: "Recurrent gastritis pain after irregular meals.",
    lab: "No lab report",
    lastVisit: "13 Apr 2026",
  },
  "P-1005": {
    phone: "+880 1711-100005",
    gender: "Female",
    bloodGroup: "O-",
    diagnosis: "Post viral fatigue",
    history: "Weakness and fatigue after recent fever recovery.",
    lab: "No lab report",
    lastVisit: "13 Apr 2026",
  },
  "P-1006": {
    phone: "+880 1711-100006",
    gender: "Male",
    bloodGroup: "B-",
    diagnosis: "Diabetes follow-up",
    history: "Type-2 diabetes routine review. Diet chart update requested.",
    lab: "Glucose report pending",
    lastVisit: "13 Apr 2026",
  },
};

const prescriptionHistory = {
  "P-1001": [
    {
      id: "RX-1001-02",
      date: "13 Apr 2026",
      title: "Migraine Follow-up",
      diagnosis: "Migraine",
      medicines: "Pain management, hydration support, sleep routine.",
      advice:
        "Avoid stress triggers, reduce screen time, follow-up after 14 days.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
    {
      id: "RX-1001-01",
      date: "28 Mar 2026",
      title: "Recurring Headache",
      diagnosis: "Headache with nausea",
      medicines: "Paracetamol when needed, oral hydration.",
      advice: "Keep headache diary and maintain sleep schedule.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
  ],
  "P-1002": [
    {
      id: "RX-1002-01",
      date: "13 Apr 2026",
      title: "BP Follow-up",
      diagnosis: "Hypertension",
      medicines: "Continue BP medicine as advised.",
      advice: "Low salt diet, daily BP chart, review after 7 days.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
  ],
  "P-1003": [
    {
      id: "RX-1003-02",
      date: "13 Apr 2026",
      title: "Urgent Fever Review",
      diagnosis: "Fever with chest discomfort",
      medicines: "CBC, CXR, oxygen monitoring, urgent review.",
      advice: "Return immediately if breathing discomfort increases.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
    {
      id: "RX-1003-01",
      date: "06 Apr 2026",
      title: "Fever Consultation",
      diagnosis: "Viral fever suspected",
      medicines: "Fever management and hydration support.",
      advice: "Monitor temperature every 6 hours.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
  ],
  "P-1004": [
    {
      id: "RX-1004-01",
      date: "13 Apr 2026",
      title: "Gastritis Care",
      diagnosis: "Gastritis",
      medicines: "Antacid support, meal routine correction.",
      advice: "Avoid spicy food, avoid empty stomach.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
  ],
  "P-1005": [
    {
      id: "RX-1005-01",
      date: "13 Apr 2026",
      title: "Post Viral Fatigue",
      diagnosis: "Post viral weakness",
      medicines: "Vitamin support, hydration, rest.",
      advice: "Review after 7 days if weakness continues.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
  ],
  "P-1006": [
    {
      id: "RX-1006-01",
      date: "13 Apr 2026",
      title: "Diabetes Routine Review",
      diagnosis: "Type-2 diabetes follow-up",
      medicines: "Fasting glucose review, medication adjustment if needed.",
      advice: "Diet chart update and regular glucose monitoring.",
      doctor: "Professor Dr. Md. Tofael Hossain Bhuiyan",
    },
  ],
};

const PatientPrescriptionHistory = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const activePatientId = patientId || "P-1003";
  const patient = patients.find((item) => item.id === activePatientId);
  const details = patientExtraDetails[activePatientId] || {};
  const prescriptions = prescriptionHistory[activePatientId] || [];

  const handleBack = () => {
    navigate("/doctor/patient-records");
  };

  const handlePrint = () => {
    window.print();
  };

  if (!patient) {
    return (
      <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d8fbfb_0%,#efffff_34%,#e9f8f8_70%,#f7ffff_100%)] p-4 text-[#12464d]">
        <div className="mx-auto max-w-xl rounded-[30px] border border-white/80 bg-white/85 p-6 text-center shadow-[0_22px_70px_rgba(16,118,126,0.12)] backdrop-blur-2xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-[#e9fbfb]">
            <FileText className="text-[#75a7ac]" size={36} />
          </div>

          <h1 className="mt-4 text-2xl font-black">Patient not found</h1>

          <p className="mt-2 text-sm font-semibold text-[#6d969a]">
            Please go back and select a valid patient.
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f9aa3] px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0f7f87] hover:shadow-[0_14px_32px_rgba(15,154,163,0.24)] active:scale-95"
          >
            <ArrowLeft size={16} />
            Back to Records
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,#d8fbfb_0%,#efffff_34%,#e9f8f8_70%,#f7ffff_100%)] px-3 py-3 text-[#12464d] sm:px-4 md:p-5">
      <div className="mx-auto w-full max-w-[1320px] space-y-4">
        <div className="overflow-hidden rounded-[32px] border border-white/80 bg-white/60 shadow-[0_24px_80px_rgba(16,118,126,0.13)] backdrop-blur-2xl">
          <div className="relative overflow-hidden border-b border-white/70 bg-gradient-to-r from-white/90 via-[#e7fbfb]/95 to-[#d9f4f5]/95 px-4 py-4 md:px-5">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#9eecef]/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 rounded-full bg-white/80 blur-3xl" />

            <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#c9eef0] bg-white/85 text-[#0f7078] shadow-sm transition hover:-translate-x-1 hover:bg-[#e9fbfb] hover:shadow-[0_12px_28px_rgba(16,118,126,0.12)] active:scale-95"
                  title="Back to Patient Records"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#bdebed] bg-[#e3fbfb] text-[#0f8f99] shadow-inner transition hover:scale-105">
                  <FilePenLine size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0f8f99]">
                    Prescription History
                  </p>

                  <h1 className="mt-1 truncate text-xl font-black tracking-tight text-[#12464d] md:text-2xl">
                    {patient.name}
                  </h1>

                  <p className="mt-0.5 text-xs font-semibold text-[#5f858a] md:text-sm">
                    Previous prescriptions, clinical summary and patient profile
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                <Link
                  to={`/doctor/patients/${patient.id}`}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#bdebed] bg-white/85 px-3 py-2 text-xs font-black text-[#0f7078] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e3fbfb] hover:shadow-[0_12px_26px_rgba(16,118,126,0.12)] active:scale-95"
                >
                  <UserRound size={14} />
                  Patient Details
                </Link>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#bdebed] bg-white/85 px-3 py-2 text-xs font-black text-[#0f7078] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e3fbfb] hover:shadow-[0_12px_26px_rgba(16,118,126,0.12)] active:scale-95"
                >
                  <Printer size={14} />
                  Print
                </button>

                <Link
                  to={`/doctor/patients/${patient.id}`}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0f9aa3] px-3 py-2 text-xs font-black text-white shadow-[0_10px_24px_rgba(15,154,163,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0f7f87] hover:shadow-[0_16px_34px_rgba(15,154,163,0.28)] active:scale-95"
                >
                  <Plus size={14} />
                  Add New Rx
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Patient ID", value: patient.id },
              {
                label: "Phone",
                value: details.phone || "Not available",
                phone: true,
              },
              {
                label: "Serial / Age",
                value: `${patient.serial} • ${patient.age} years`,
              },
              {
                label: "Blood / Gender",
                value: `${details.bloodGroup || "N/A"} • ${
                  details.gender || "N/A"
                }`,
              },
              { label: "Last Visit", value: details.lastVisit || "N/A" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#c9eef0] bg-white/80 p-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(16,118,126,0.10)]"
              >
                <span className="text-[11px] font-black text-[#75a7ac]">
                  {item.label}
                </span>

                {item.phone ? (
                  <a
                    href={`tel:${item.value}`}
                    className="mt-1 flex items-center gap-1 text-sm font-black text-[#0f8f99] transition hover:text-[#0f7078]"
                  >
                    <PhoneCall size={13} />
                    {item.value}
                  </a>
                ) : (
                  <strong className="mt-1 block truncate text-sm font-black text-[#12464d]">
                    {item.value}
                  </strong>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-[0_16px_45px_rgba(16,118,126,0.09)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <UserRound size={18} className="text-[#0f9aa3]" />
                  <h2 className="text-base font-black text-[#12464d]">
                    Patient Details
                  </h2>
                </div>

                <span className="rounded-full bg-[#e3fbfb] px-2.5 py-1 text-[10px] font-black text-[#0f8f99] ring-1 ring-[#bdebed]">
                  Active Case
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="rounded-2xl border border-[#d3eef0] bg-[#f7ffff] px-3 py-2.5 transition hover:-translate-y-0.5 hover:bg-white">
                  <p className="text-xs font-black text-[#75a7ac]">Problem</p>
                  <p className="mt-1 font-bold text-[#12464d]">
                    {patient.complaint}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d3eef0] bg-white/90 px-3 py-2.5 transition hover:-translate-y-0.5 hover:bg-[#f7ffff]">
                  <p className="text-xs font-black text-[#75a7ac]">Diagnosis</p>
                  <p className="mt-1 font-bold text-[#12464d]">
                    {details.diagnosis || patient.complaint}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d3eef0] bg-white/90 px-3 py-2.5 transition hover:-translate-y-0.5 hover:bg-[#f7ffff]">
                  <p className="text-xs font-black text-[#75a7ac]">History</p>
                  <p className="mt-1 font-semibold leading-6 text-[#5f858a]">
                    {details.history || "No history added yet."}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d3eef0] bg-white/90 px-3 py-2.5 transition hover:-translate-y-0.5 hover:bg-[#f7ffff]">
                  <p className="text-xs font-black text-[#75a7ac]">
                    Lab / Report
                  </p>
                  <p className="mt-1 font-bold text-[#12464d]">
                    {details.lab || "No report"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#bdebed] bg-gradient-to-br from-[#e9fbfb] to-white/80 p-4 shadow-[0_12px_35px_rgba(16,118,126,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(16,118,126,0.10)]">
              <div className="flex items-center gap-2">
                <Stethoscope size={18} className="text-[#0f9aa3]" />
                <h3 className="text-sm font-black text-[#12464d]">
                  Doctor Action
                </h3>
              </div>

              <p className="mt-2 text-xs font-semibold leading-5 text-[#5f858a]">
                Add New Rx click করলে patient details page open হবে।
              </p>

              <Link
                to={`/doctor/patients/${patient.id}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f9aa3] px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0f7f87] hover:shadow-[0_16px_34px_rgba(15,154,163,0.28)] active:scale-95"
              >
                <FilePenLine size={15} />
                Add New Prescription
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/75 shadow-[0_16px_45px_rgba(16,118,126,0.09)] backdrop-blur-xl">
            <div className="flex flex-col gap-2 border-b border-[#c9eef0] bg-gradient-to-r from-white via-[#eefdfd] to-[#dff7f8] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-black text-[#12464d]">
                  Previous Prescriptions
                </h2>

                <p className="mt-0.5 text-xs font-bold text-[#6d969a]">
                  {prescriptions.length} prescription records found
                </p>
              </div>

              <Link
                to={`/doctor/patients/${patient.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f9aa3] px-3 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0f7f87] hover:shadow-[0_16px_34px_rgba(15,154,163,0.22)] active:scale-95"
              >
                <Plus size={14} />
                Add New Rx
              </Link>
            </div>

            <div className="grid gap-3 p-4">
              {prescriptions.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-[#c9eef0] bg-white/90 p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-[#f7ffff] hover:shadow-[0_16px_38px_rgba(16,118,126,0.12)]"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#0f9aa3] transition group-hover:w-1.5" />

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-lg bg-[#e3fbfb] px-2 py-1 text-[10px] font-black text-[#0f8f99] ring-1 ring-[#bdebed]">
                          {item.id}
                        </span>

                        {index === 0 && (
                          <span className="inline-flex rounded-lg bg-[#0f9aa3] px-2 py-1 text-[10px] font-black text-white">
                            Latest
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-sm font-black text-[#12464d]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-[#75a7ac]">
                        {item.date} • {item.doctor}
                      </p>
                    </div>

                    <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-[#f7ffff] px-2 py-1 text-[10px] font-black text-[#0f7078] ring-1 ring-[#d3eef0]">
                      <CalendarDays size={11} />
                      Previous
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 md:grid-cols-3">
                    <div className="rounded-xl border border-[#d3eef0] bg-[#f7ffff] px-3 py-2 transition group-hover:bg-white">
                      <p className="text-[11px] font-black text-[#75a7ac]">
                        Diagnosis
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-[#12464d]">
                        {item.diagnosis}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#d3eef0] bg-[#f7ffff] px-3 py-2 transition group-hover:bg-white">
                      <p className="text-[11px] font-black text-[#75a7ac]">
                        Medicines
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-[#12464d]">
                        {item.medicines}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#d3eef0] bg-[#f7ffff] px-3 py-2 transition group-hover:bg-white">
                      <p className="text-[11px] font-black text-[#75a7ac]">
                        Advice
                      </p>
                      <p className="mt-1 text-xs font-bold leading-5 text-[#12464d]">
                        {item.advice}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/doctor/patients/${patient.id}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-black text-[#0f9aa3] transition hover:translate-x-1 hover:text-[#0f7078]"
                  >
                    Create follow-up prescription
                    <ChevronRight size={14} />
                  </Link>
                </div>
              ))}

              {prescriptions.length === 0 && (
                <div className="grid place-items-center rounded-2xl border border-dashed border-[#c9eef0] bg-[#f7ffff] px-5 py-12 text-center">
                  <FileText size={34} className="text-[#75a7ac]" />

                  <h3 className="mt-3 text-base font-black text-[#12464d]">
                    No previous prescription found
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-[#6d969a]">
                    Create the first prescription for this patient.
                  </p>

                  <Link
                    to={`/doctor/patients/${patient.id}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f9aa3] px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0f7f87] hover:shadow-[0_16px_34px_rgba(15,154,163,0.22)] active:scale-95"
                  >
                    <Plus size={14} />
                    Add New Prescription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#c9eef0] bg-white/65 p-3 text-center text-xs font-bold text-[#6d969a] shadow-[0_12px_35px_rgba(16,118,126,0.06)] backdrop-blur-xl">
          Back button opens Patient Records. Add New Rx opens Patient Details.
        </div>
      </div>
    </section>
  );
};

export default PatientPrescriptionHistory;
