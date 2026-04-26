import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  Eye,
  FilePenLine,
  FileText,
  Filter,
  PhoneCall,
  Printer,
  RefreshCcw,
  Search,
  ShieldPlus,
  X,
} from "lucide-react";
import { patients } from "../../data/mockData";

const patientRecordDetails = {
  "P-1001": {
    phone: "+880 1711-100001",
    diagnosis: "Migraine",
    history:
      "Recurrent headache for 2 years. Triggered by stress and lack of sleep.",
    prescription:
      "Pain management, hydration, sleep routine, follow-up after 14 days.",
    lab: "No lab report",
    lastVisit: "13 Apr 2026",
  },
  "P-1002": {
    phone: "+880 1711-100002",
    diagnosis: "Hypertension",
    history:
      "Known high blood pressure patient. Regular BP monitoring required.",
    prescription:
      "Continue BP medicine, low salt diet, BP chart review after 7 days.",
    lab: "BP chart uploaded",
    lastVisit: "13 Apr 2026",
  },
  "P-1003": {
    phone: "+880 1711-100003",
    diagnosis: "Fever with chest discomfort",
    history:
      "Persistent fever for 5 days. Assistant marked vitals as unstable.",
    prescription: "CBC, CXR, oxygen monitoring, urgent doctor review.",
    lab: "CBC + CXR suggested",
    lastVisit: "13 Apr 2026",
  },
  "P-1004": {
    phone: "+880 1711-100004",
    diagnosis: "Gastritis",
    history: "Recurrent gastritis pain after irregular meals.",
    prescription:
      "Antacid, food routine, avoid spicy food, follow-up if pain continues.",
    lab: "No lab report",
    lastVisit: "13 Apr 2026",
  },
  "P-1005": {
    phone: "+880 1711-100005",
    diagnosis: "Post viral fatigue",
    history: "Weakness and fatigue after recent fever recovery.",
    prescription: "Rest, hydration, vitamin support, review after 7 days.",
    lab: "No lab report",
    lastVisit: "13 Apr 2026",
  },
  "P-1006": {
    phone: "+880 1711-100006",
    diagnosis: "Diabetes follow-up",
    history: "Type-2 diabetes routine review. Diet chart update requested.",
    prescription:
      "Fasting glucose review, diet chart, medicine adjustment if needed.",
    lab: "Glucose report pending",
    lastVisit: "13 Apr 2026",
  },
};

const statusClass = {
  Next: "bg-[#d9fbfb] text-[#087b82] ring-[#9de7ea]",
  Waiting: "bg-[#e2fbf2] text-[#0b7a61] ring-[#a9ead9]",
  Urgent: "bg-[#fff1f2] text-[#dc2626] ring-[#fecdd3]",
  "In Progress": "bg-[#dcf7ff] text-[#087ea4] ring-[#a5e7f7]",
  Skipped: "bg-[#fff7ed] text-[#c2410c] ring-[#fed7aa]",
  Completed: "bg-slate-100 text-slate-600 ring-slate-200",
};

const statusDotClass = {
  Next: "bg-[#16aab3]",
  Waiting: "bg-[#10b981]",
  Urgent: "bg-red-500",
  "In Progress": "bg-cyan-500",
  Skipped: "bg-orange-400",
  Completed: "bg-slate-500",
};

const escapeCsv = (value) => {
  const safeValue = String(value ?? "");
  return `"${safeValue.replaceAll('"', '""')}"`;
};

const escapeHtml = (value) => {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const PatientRecords = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const recordRows = useMemo(() => {
    return patients.map((patient) => {
      const details = patientRecordDetails[patient.id] || {};

      return {
        ...patient,
        phone: details.phone || "Not available",
        diagnosis: details.diagnosis || patient.complaint,
        history: details.history || "No patient history added yet.",
        prescription: details.prescription || "No prescription added yet.",
        lab: details.lab || "No lab report",
        lastVisit: details.lastVisit || "Not available",
      };
    });
  }, []);

  const statusFilters = useMemo(() => {
    return ["All", ...new Set(recordRows.map((patient) => patient.status))];
  }, [recordRows]);

  const filteredRecords = useMemo(() => {
    const query = searchValue.toLowerCase().trim();

    return recordRows.filter((patient) => {
      const matchesStatus =
        selectedStatus === "All" || patient.status === selectedStatus;

      const matchesSearch =
        !query ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query) ||
        patient.name.toLowerCase().includes(query) ||
        patient.complaint.toLowerCase().includes(query) ||
        patient.status.toLowerCase().includes(query) ||
        patient.diagnosis.toLowerCase().includes(query) ||
        patient.serial.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [recordRows, searchValue, selectedStatus]);

  const urgentCount = recordRows.filter(
    (patient) => patient.status === "Urgent" || patient.forwarded,
  ).length;

  const todayLabel = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/doctor/dashboard");
  };

  const handleReset = () => {
    setSearchValue("");
    setSelectedStatus("All");
  };

  const handleExportCsv = () => {
    const headers = [
      "No",
      "Serial",
      "Patient ID",
      "Phone",
      "Patient Name",
      "Age",
      "Problem",
      "Diagnosis",
      "History",
      "Prescription",
      "Lab / Report",
      "Status",
      "Visit Time",
      "Last Visit",
    ];

    const rows = filteredRecords.map((patient, index) => [
      index + 1,
      patient.serial,
      patient.id,
      patient.phone,
      patient.name,
      patient.age,
      patient.complaint,
      patient.diagnosis,
      patient.history,
      patient.prescription,
      patient.lab,
      patient.status,
      patient.timeSlot,
      patient.lastVisit,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `patient-records-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printRows = filteredRecords
      .map(
        (patient, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(patient.serial)}</td>
            <td>${escapeHtml(patient.id)}</td>
            <td>${escapeHtml(patient.phone)}</td>
            <td>${escapeHtml(patient.name)}</td>
            <td>${escapeHtml(patient.age)}</td>
            <td>${escapeHtml(patient.complaint)}</td>
            <td>${escapeHtml(patient.diagnosis)}</td>
            <td>${escapeHtml(patient.history)}</td>
            <td>${escapeHtml(patient.prescription)}</td>
            <td>${escapeHtml(patient.lab)}</td>
            <td>${escapeHtml(patient.status)}</td>
            <td>${escapeHtml(patient.timeSlot)}</td>
            <td>${escapeHtml(patient.lastVisit)}</td>
          </tr>
        `,
      )
      .join("");

    const printWindow = window.open("", "_blank", "width=1400,height=900");

    if (!printWindow) return;

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Patient Records</title>
          <style>
            * { box-sizing: border-box; }

            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              color: #113b41;
              background: #f1ffff;
            }

            .topbar {
              padding: 16px 18px;
              background: linear-gradient(135deg, #0f9aa3, #0f7078);
              color: #ffffff;
              border-radius: 14px 14px 0 0;
            }

            .topbar h1 {
              margin: 0;
              font-size: 22px;
            }

            .topbar p {
              margin: 5px 0 0;
              font-size: 12px;
              opacity: 0.9;
            }

            .meta {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 8px;
              padding: 12px;
              border: 1px solid #c9eef0;
              border-top: 0;
              background: #e9fbfb;
              margin-bottom: 16px;
            }

            .meta div {
              padding: 9px;
              background: #ffffff;
              border: 1px solid #d9f2f3;
              border-radius: 10px;
              font-size: 11px;
            }

            .meta strong {
              display: block;
              margin-top: 4px;
              font-size: 15px;
              color: #0f7078;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 10.5px;
            }

            th {
              background: #285d63;
              color: #ffffff;
              border: 1px solid #cbd5e1;
              padding: 7px;
              text-align: left;
            }

            td {
              border: 1px solid #cbd5e1;
              padding: 7px;
              vertical-align: top;
            }

            tr:nth-child(even) td {
              background: #f8ffff;
            }

            @media print {
              body { padding: 0; }
            }
          </style>
        </head>

        <body>
          <div class="topbar">
            <h1>Patient Record Management</h1>
            <p>Clinical history, diagnosis and prescription sheet</p>
          </div>

          <div class="meta">
            <div>Total Records <strong>${recordRows.length}</strong></div>
            <div>Printed Records <strong>${filteredRecords.length}</strong></div>
            <div>Urgent / Forwarded <strong>${urgentCount}</strong></div>
            <div>Print Date <strong>${todayLabel}</strong></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Serial</th>
                <th>Patient ID</th>
                <th>Phone</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Problem</th>
                <th>Diagnosis</th>
                <th>History</th>
                <th>Prescription</th>
                <th>Lab / Report</th>
                <th>Status</th>
                <th>Visit Time</th>
                <th>Last Visit</th>
              </tr>
            </thead>
            <tbody>${printRows}</tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <section className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,#d8fbfb_0%,#efffff_34%,#e9f8f8_70%,#f7ffff_100%)] px-3 py-3 text-[#12464d] sm:px-4 md:p-5">
      <div className="mx-auto w-full max-w-[1500px] space-y-4">
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/55 shadow-[0_22px_70px_rgba(16,118,126,0.12)] backdrop-blur-2xl">
          <div className="relative overflow-hidden border-b border-white/70 bg-gradient-to-r from-white/80 via-[#e7fbfb]/90 to-[#d9f4f5]/90 px-4 py-4 md:px-5">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#9eecef]/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 rounded-full bg-white/60 blur-3xl" />

            <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c9eef0] bg-white/80 text-[#0f7078] shadow-sm backdrop-blur transition hover:-translate-x-0.5 hover:bg-[#e9fbfb] active:scale-95"
                  title="Go back"
                >
                  <ArrowLeft size={17} />
                </button>

                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#bdebed] bg-[#e3fbfb] text-[#0f8f99] shadow-inner">
                  <ShieldPlus size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0f8f99]">
                    Doctor Workspace
                  </p>

                  <h1 className="mt-1 truncate text-xl font-black tracking-tight text-[#12464d] md:text-2xl">
                    Patient Record Management
                  </h1>

                  <p className="mt-0.5 text-xs font-semibold text-[#5f858a] md:text-sm">
                    Compact Excel-style clinical records with patient phone
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#bdebed] bg-white/80 px-3 py-2 text-xs font-black text-[#0f7078] shadow-sm transition hover:bg-[#e3fbfb] active:scale-95"
                >
                  <Printer size={14} />
                  Print
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#0f9aa3]/20 bg-[#0f9aa3] px-3 py-2 text-xs font-black text-white shadow-[0_10px_24px_rgba(15,154,163,0.22)] transition hover:bg-[#0f7f87] active:scale-95"
                >
                  <Download size={14} />
                  Export
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#bdebed] bg-white/70 px-3 py-2 text-xs font-black text-[#5f858a] shadow-sm transition hover:bg-white hover:text-[#0f7078] active:scale-95"
                >
                  <RefreshCcw size={14} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-[#c9eef0]/70 bg-white/45 p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bdebed] bg-[#e3fbfb] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#0f8f99]">
              <CalendarDays size={13} />
              Today&apos;s Sheet
            </span>

            <h2 className="mt-3 max-w-4xl text-xl font-black tracking-tight text-[#12464d] md:text-3xl">
              Daily Patient Diagnosis & Treatment Record
            </h2>

            <p className="mt-2 max-w-4xl text-xs font-semibold leading-6 text-[#5f858a] md:text-sm">
              Doctor এক জায়গা থেকে patient ID, phone, diagnosis, history,
              report, prescription summary এবং action button manage করতে পারবে।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            {
              label: "Total",
              value: recordRows.length,
              tone: "text-[#0f7078]",
            },
            {
              label: "Showing",
              value: filteredRecords.length,
              tone: "text-[#0f8f99]",
            },
            { label: "Urgent", value: urgentCount, tone: "text-red-600" },
            { label: "Date", value: todayLabel, tone: "text-[#12464d]" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/80 bg-white/70 p-3 shadow-[0_12px_35px_rgba(16,118,126,0.07)] backdrop-blur-xl"
            >
              <span className="text-[11px] font-black text-[#75a7ac]">
                {item.label}
              </span>

              <strong
                className={`mt-1 block truncate text-2xl font-black ${item.tone}`}
              >
                {item.value}
              </strong>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/80 bg-white/70 p-3 shadow-[0_12px_35px_rgba(16,118,126,0.07)] backdrop-blur-xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-black text-[#12464d]">
            <Filter size={15} className="text-[#0f9aa3]" />
            Filter & Search
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 xl:max-w-[62%]">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black ring-1 transition active:scale-95 ${
                    selectedStatus === status
                      ? "bg-[#0f9aa3] text-white ring-[#0f9aa3] shadow-[0_10px_22px_rgba(15,154,163,0.22)]"
                      : "bg-white/80 text-[#5f858a] ring-[#c9eef0] hover:bg-[#e3fbfb] hover:text-[#0f7078]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === "All"
                        ? "bg-current"
                        : statusDotClass[status] || "bg-slate-400"
                    }`}
                  />
                  {status}
                </button>
              ))}
            </div>

            <div className="flex w-full items-center gap-2 rounded-2xl border border-[#c9eef0] bg-white/90 px-3 py-2.5 shadow-[0_12px_35px_rgba(16,118,126,0.06)] xl:max-w-[420px]">
              <Search size={16} className="shrink-0 text-[#75a7ac]" />

              <input
                type="text"
                placeholder="Search name, ID, phone, serial, problem..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#12464d] outline-none placeholder:text-[#8fb5b9] md:text-sm"
              />

              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e9fbfb] text-[#75a7ac] transition hover:bg-red-50 hover:text-red-600"
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/75 shadow-[0_22px_70px_rgba(16,118,126,0.10)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 border-b border-[#c9eef0]/80 bg-gradient-to-r from-white via-[#eefdfd] to-[#dff7f8] px-4 py-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-black tracking-tight text-[#12464d]">
                Patient Diagnosis & Treatment Sheet
              </h3>

              <p className="mt-0.5 text-xs font-bold text-[#6d969a]">
                Patient ID, phone, diagnosis and prescription in one clean sheet
              </p>
            </div>

            <div className="w-fit rounded-full border border-[#c9eef0] bg-white/80 px-3 py-1.5 text-xs font-black text-[#0f8f99] shadow-sm">
              {filteredRecords.length} visible
            </div>
          </div>

          <div className="hidden w-full overflow-x-auto lg:block">
            <table className="w-full min-w-[1240px] border-collapse text-left">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th
                    colSpan="4"
                    className="border border-[#c9eef0] bg-[#0f9aa3] px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white"
                  >
                    Patient Info
                  </th>

                  <th
                    colSpan="3"
                    className="border border-[#c9eef0] bg-[#0f858e] px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white"
                  >
                    Clinical Info
                  </th>

                  <th
                    colSpan="3"
                    className="border border-[#c9eef0] bg-[#10747c] px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white"
                  >
                    Treatment
                  </th>

                  <th
                    colSpan="1"
                    className="border border-[#c9eef0] bg-[#285d63] px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white"
                  >
                    Actions
                  </th>
                </tr>

                <tr>
                  {[
                    "No",
                    "Serial",
                    "ID / Phone",
                    "Patient",
                    "Problem",
                    "Diagnosis",
                    "History",
                    "Prescription",
                    "Report",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="border border-[#d3eef0] bg-[#356a70] px-3 py-2 text-center text-[10px] font-black uppercase tracking-wide text-white"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className="group transition even:bg-[#f7ffff] hover:bg-[#e8fbfb]"
                  >
                    <td className="border border-[#d3eef0] px-3 py-2 text-xs font-black text-[#12464d]">
                      {index + 1}
                    </td>

                    <td className="border border-[#d3eef0] px-3 py-2 text-xs font-black text-[#12464d]">
                      {patient.serial}
                    </td>

                    <td className="border border-[#d3eef0] px-3 py-2">
                      <div className="flex min-w-[128px] flex-col gap-1">
                        <span className="inline-flex w-fit rounded-lg bg-[#e3fbfb] px-2 py-1 text-[11px] font-black text-[#0f8f99] ring-1 ring-[#bdebed]">
                          {patient.id}
                        </span>

                        <a
                          href={`tel:${patient.phone}`}
                          className="inline-flex items-center gap-1 text-[10px] font-black text-[#5f858a] transition hover:text-[#0f9aa3]"
                        >
                          <PhoneCall size={10} />
                          {patient.phone}
                        </a>
                      </div>
                    </td>

                    <td className="border border-[#d3eef0] px-3 py-2">
                      <div className="flex flex-col">
                        <strong className="whitespace-nowrap text-xs font-black text-[#12464d]">
                          {patient.name}
                        </strong>

                        <small className="mt-0.5 text-[10px] font-bold text-[#6d969a]">
                          Age {patient.age} • Last {patient.lastVisit}
                        </small>
                      </div>
                    </td>

                    <td className="max-w-[160px] border border-[#d3eef0] px-3 py-2 text-xs font-semibold leading-5 text-[#5f858a]">
                      {patient.complaint}
                    </td>

                    <td className="max-w-[145px] border border-[#d3eef0] px-3 py-2 text-xs font-bold leading-5 text-[#12464d]">
                      {patient.diagnosis}
                    </td>

                    <td className="max-w-[210px] border border-[#d3eef0] px-3 py-2 text-xs font-semibold leading-5 text-[#5f858a]">
                      {patient.history}
                    </td>

                    <td className="max-w-[210px] border border-[#d3eef0] px-3 py-2 text-xs font-semibold leading-5 text-[#5f858a]">
                      {patient.prescription}
                    </td>

                    <td className="max-w-[115px] border border-[#d3eef0] px-3 py-2 text-xs font-semibold text-[#5f858a]">
                      {patient.lab}
                    </td>

                    <td className="border border-[#d3eef0] px-3 py-2">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-lg px-2 py-1 text-[11px] font-black ring-1 ${
                          statusClass[patient.status] ||
                          "bg-slate-100 text-slate-600 ring-slate-200"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td className="border border-[#d3eef0] px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <Link
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#c9eef0] bg-white px-2.5 py-1.5 text-[11px] font-black text-[#0f7078] shadow-sm transition hover:bg-[#0f9aa3] hover:text-white active:scale-95"
                          to={`/doctor/patients/${patient.id}`}
                        >
                          <Eye size={12} />
                          View
                        </Link>

                        <Link
                          className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#0f9aa3] px-2.5 py-1.5 text-[11px] font-black text-white shadow-sm transition hover:bg-[#0f7f87] active:scale-95"
                          to={`/doctor/patients/${patient.id}/prescriptions`}
                        >
                          <FilePenLine size={12} />
                          Rx
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 p-3 lg:hidden">
            {filteredRecords.map((patient, index) => (
              <div
                key={patient.id}
                className="overflow-hidden rounded-2xl border border-[#c9eef0] bg-white/85 shadow-[0_12px_35px_rgba(16,118,126,0.08)] backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3 border-b border-[#d3eef0] bg-gradient-to-r from-[#efffff] to-[#dff7f8] px-3 py-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-[#0f9aa3] px-2 py-1 text-[10px] font-black text-white">
                        #{index + 1}
                      </span>

                      <span className="rounded-lg bg-white/90 px-2 py-1 text-[10px] font-black text-[#0f8f99] ring-1 ring-[#bdebed]">
                        {patient.id}
                      </span>

                      <a
                        href={`tel:${patient.phone}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-black text-[#5f858a] ring-1 ring-[#d3eef0]"
                      >
                        <PhoneCall size={10} />
                        {patient.phone}
                      </a>
                    </div>

                    <h4 className="mt-2 truncate text-sm font-black text-[#12464d]">
                      {patient.name}
                    </h4>

                    <p className="mt-0.5 text-xs font-bold text-[#6d969a]">
                      {patient.serial} • Age {patient.age} • {patient.timeSlot}
                    </p>
                  </div>

                  <span
                    className={`inline-flex shrink-0 whitespace-nowrap rounded-lg px-2 py-1 text-[10px] font-black ring-1 ${
                      statusClass[patient.status] ||
                      "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>

                <div className="grid gap-2 px-3 py-3 text-xs">
                  <div className="rounded-xl border border-[#d3eef0] bg-[#f7ffff] px-3 py-2">
                    <span className="font-black text-[#75a7ac]">Problem</span>

                    <p className="mt-1 font-bold leading-5 text-[#12464d]">
                      {patient.complaint}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#d3eef0] bg-white/90 px-3 py-2">
                      <span className="font-black text-[#75a7ac]">
                        Diagnosis
                      </span>

                      <p className="mt-1 font-bold leading-5 text-[#12464d]">
                        {patient.diagnosis}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#d3eef0] bg-white/90 px-3 py-2">
                      <span className="font-black text-[#75a7ac]">Report</span>

                      <p className="mt-1 font-bold leading-5 text-[#12464d]">
                        {patient.lab}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#bdebed] bg-[#e9fbfb] px-3 py-2">
                    <span className="font-black text-[#0f8f99]">
                      Prescription
                    </span>

                    <p className="mt-1 font-bold leading-5 text-[#12464d]">
                      {patient.prescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-[#d3eef0] bg-[#f7ffff] px-3 py-3">
                  <Link
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#c9eef0] bg-white px-3 py-2 text-xs font-black text-[#0f7078] shadow-sm transition hover:bg-[#0f9aa3] hover:text-white active:scale-95"
                    to={`/doctor/patients/${patient.id}`}
                  >
                    <Eye size={14} />
                    View
                  </Link>

                  <Link
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0f9aa3] px-3 py-2 text-xs font-black text-white shadow-sm transition hover:bg-[#0f7f87] active:scale-95"
                    to={`/doctor/patients/${patient.id}/prescriptions`}
                  >
                    <FilePenLine size={14} />
                    Prescription
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="grid place-items-center px-5 py-14 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e9fbfb]">
                <FileText size={30} className="text-[#75a7ac]" />
              </div>

              <h3 className="mt-3 text-base font-black text-[#12464d]">
                No patient record found
              </h3>

              <p className="mt-1 text-xs font-semibold text-[#6d969a]">
                Try another patient name, ID, phone, serial, problem or
                diagnosis.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0f9aa3] px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-[#0f7f87] active:scale-95"
              >
                <RefreshCcw size={14} />
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PatientRecords;
