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
              word-break: break-word;
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
    <section className="min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#d8fbfb_0%,#efffff_34%,#e9f8f8_70%,#f7ffff_100%)] px-1.5 py-3 text-[#12464d] sm:px-4 md:p-5">
      <div className="mx-auto w-full max-w-[1500px] space-y-3 sm:space-y-4">
        <div className="overflow-hidden rounded-[20px] border border-white/80 bg-white/60 shadow-[0_18px_50px_rgba(16,118,126,0.10)] backdrop-blur-2xl sm:rounded-[28px]">
          <div className="relative overflow-hidden border-b border-white/70 bg-gradient-to-r from-white/85 via-[#e7fbfb]/90 to-[#d9f4f5]/90 px-3 py-4 sm:px-4 md:px-5">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#9eecef]/35 blur-3xl" />

            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c9eef0] bg-white/85 text-[#0f7078] shadow-sm transition hover:bg-[#e9fbfb] active:scale-95"
                  title="Go back"
                >
                  <ArrowLeft size={17} />
                </button>

                <div className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#bdebed] bg-[#e3fbfb] text-[#0f8f99] shadow-inner xs:grid sm:grid">
                  <ShieldPlus size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#0f8f99] sm:text-[10px]">
                    Doctor Workspace
                  </p>

                  <h1 className="mt-1 text-[18px] font-black leading-tight tracking-tight text-[#12464d] sm:text-xl md:text-2xl">
                    Patient Record Management
                  </h1>

                  <p className="mt-1 text-[11px] font-semibold leading-5 text-[#5f858a] sm:text-xs md:text-sm">
                    Compact Excel-style clinical records with patient phone
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex min-h-10 min-w-[92px] flex-1 items-center justify-center gap-1 rounded-xl border border-[#bdebed] bg-white/85 px-2 py-2 text-[11px] font-black text-[#0f7078] shadow-sm transition hover:bg-[#e3fbfb] active:scale-95 sm:min-w-0 sm:flex-none sm:px-3 sm:text-xs"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex min-h-10 min-w-[92px] flex-1 items-center justify-center gap-1 rounded-xl border border-[#0f9aa3]/20 bg-[#0f9aa3] px-2 py-2 text-[11px] font-black text-white shadow-[0_10px_24px_rgba(15,154,163,0.22)] transition hover:bg-[#0f7f87] active:scale-95 sm:min-w-0 sm:flex-none sm:px-3 sm:text-xs"
                >
                  <Download size={14} />
                  <span>Export</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-10 min-w-[92px] flex-1 items-center justify-center gap-1 rounded-xl border border-[#bdebed] bg-white/75 px-2 py-2 text-[11px] font-black text-[#5f858a] shadow-sm transition hover:bg-white hover:text-[#0f7078] active:scale-95 sm:min-w-0 sm:flex-none sm:px-3 sm:text-xs"
                >
                  <RefreshCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-[#c9eef0]/70 bg-white/45 p-3 sm:p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bdebed] bg-[#e3fbfb] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#0f8f99]">
              <CalendarDays size={13} />
              Today&apos;s Sheet
            </span>

            <h2 className="mt-3 text-[20px] font-black leading-tight tracking-tight text-[#12464d] sm:text-2xl md:text-3xl">
              Daily Patient Diagnosis & Treatment Record
            </h2>

            <p className="mt-2 text-[12px] font-semibold leading-6 text-[#5f858a] md:text-sm">
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
              className="min-w-0 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-[0_12px_35px_rgba(16,118,126,0.07)] backdrop-blur-xl"
            >
              <span className="block truncate text-[10px] font-black text-[#75a7ac] sm:text-[11px]">
                {item.label}
              </span>

              <strong
                className={`mt-1 block truncate text-lg font-black sm:text-xl md:text-2xl ${item.tone}`}
              >
                {item.value}
              </strong>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/75 p-3 shadow-[0_12px_35px_rgba(16,118,126,0.07)] backdrop-blur-xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-black text-[#12464d]">
            <Filter size={15} className="shrink-0 text-[#0f9aa3]" />
            Filter & Search
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-2 xl:max-w-[62%]">
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
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      status === "All"
                        ? "bg-current"
                        : statusDotClass[status] || "bg-slate-400"
                    }`}
                  />
                  {status}
                </button>
              ))}
            </div>

            <div className="flex w-full items-center gap-2 rounded-2xl border border-[#c9eef0] bg-white/95 px-3 py-2.5 shadow-[0_12px_35px_rgba(16,118,126,0.06)] xl:max-w-[420px]">
              <Search size={16} className="shrink-0 text-[#75a7ac]" />

              <input
                type="text"
                placeholder="Search name, ID, phone..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-xs font-bold text-[#12464d] outline-none placeholder:text-[#8fb5b9] md:text-sm"
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

        <div className="overflow-hidden rounded-[20px] border border-white/80 bg-white/80 shadow-[0_22px_70px_rgba(16,118,126,0.10)] backdrop-blur-xl sm:rounded-[28px]">
          <div className="flex flex-col gap-2 border-b border-[#c9eef0]/80 bg-gradient-to-r from-white via-[#eefdfd] to-[#dff7f8] px-3 py-3 md:flex-row md:items-center md:justify-between md:px-4">
            <div>
              <h3 className="text-base font-black leading-tight tracking-tight text-[#12464d] sm:text-lg">
                Patient Diagnosis & Treatment Sheet
              </h3>
            </div>

            <div className="w-fit rounded-full border border-[#c9eef0] bg-white/85 px-3 py-1.5 text-xs font-black text-[#0f8f99] shadow-sm">
              {filteredRecords.length} visible
            </div>
          </div>

          <div className="hidden w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] lg:block">
            <table className="w-[1120px] table-fixed border-collapse text-left lg:w-full lg:min-w-[1240px]">
              <colgroup>
                <col className="w-[50px]" />
                <col className="w-[82px]" />
                <col className="w-[150px]" />
                <col className="w-[150px]" />
                <col className="w-[140px]" />
                <col className="w-[135px]" />
                <col className="w-[190px]" />
                <col className="w-[190px]" />
                <col className="w-[115px]" />
                <col className="w-[100px]" />
                <col className="w-[120px]" />
              </colgroup>

              <thead className="sticky top-0 z-10">
                <tr>
                  <th
                    colSpan="4"
                    className="border border-[#c9eef0] bg-[#0f9aa3] px-2 py-2 text-center text-[9px] font-black uppercase tracking-[0.10em] text-white sm:px-3 sm:text-[10px]"
                  >
                    Patient Info
                  </th>

                  <th
                    colSpan="3"
                    className="border border-[#c9eef0] bg-[#0f858e] px-2 py-2 text-center text-[9px] font-black uppercase tracking-[0.10em] text-white sm:px-3 sm:text-[10px]"
                  >
                    Clinical Info
                  </th>

                  <th
                    colSpan="3"
                    className="border border-[#c9eef0] bg-[#10747c] px-2 py-2 text-center text-[9px] font-black uppercase tracking-[0.10em] text-white sm:px-3 sm:text-[10px]"
                  >
                    Treatment
                  </th>

                  <th
                    colSpan="1"
                    className="border border-[#c9eef0] bg-[#285d63] px-2 py-2 text-center text-[9px] font-black uppercase tracking-[0.10em] text-white sm:px-3 sm:text-[10px]"
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
                      className="border border-[#d3eef0] bg-[#356a70] px-2 py-2 text-center text-[9px] font-black uppercase tracking-wide text-white sm:px-3 sm:text-[10px]"
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
                    className="transition even:bg-[#f7ffff] hover:bg-[#e8fbfb]"
                  >
                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-black text-[#12464d]">
                      {index + 1}
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-black text-[#12464d]">
                      {patient.serial}
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex w-fit rounded-md bg-[#e3fbfb] px-2 py-1 text-[10px] font-black text-[#0f8f99] ring-1 ring-[#bdebed]">
                          {patient.id}
                        </span>

                        <a
                          href={`tel:${patient.phone}`}
                          className="inline-flex items-center gap-1 break-all text-[10px] font-black leading-4 text-[#5f858a] transition hover:text-[#0f9aa3]"
                        >
                          <PhoneCall size={10} className="shrink-0" />
                          {patient.phone}
                        </a>
                      </div>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top">
                      <strong className="block break-words text-[11px] font-black leading-4 text-[#12464d]">
                        {patient.name}
                      </strong>

                      <small className="mt-1 block break-words text-[10px] font-bold leading-4 text-[#6d969a]">
                        Age {patient.age} • Last {patient.lastVisit}
                      </small>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-semibold leading-5 text-[#5f858a]">
                      <p className="line-clamp-4 break-words">
                        {patient.complaint}
                      </p>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-bold leading-5 text-[#12464d]">
                      <p className="line-clamp-4 break-words">
                        {patient.diagnosis}
                      </p>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-semibold leading-5 text-[#5f858a]">
                      <p className="line-clamp-5 break-words">
                        {patient.history}
                      </p>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-semibold leading-5 text-[#5f858a]">
                      <p className="line-clamp-5 break-words">
                        {patient.prescription}
                      </p>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top text-[11px] font-semibold leading-5 text-[#5f858a]">
                      <p className="line-clamp-3 break-words">{patient.lab}</p>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-black ring-1 ${
                          statusClass[patient.status] ||
                          "bg-slate-100 text-slate-600 ring-slate-200"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td className="border border-[#d3eef0] px-2 py-2 align-top">
                      <div className="grid gap-1.5">
                        <Link
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#c9eef0] bg-white px-2 py-1.5 text-[10px] font-black text-[#0f7078] shadow-sm transition hover:bg-[#0f9aa3] hover:text-white active:scale-95"
                          to={`/doctor/patients/${patient.id}`}
                        >
                          <Eye size={11} />
                          View
                        </Link>

                        <Link
                          className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#0f9aa3] px-2 py-1.5 text-[10px] font-black text-white shadow-sm transition hover:bg-[#0f7f87] active:scale-95"
                          to={`/doctor/patients/${patient.id}/prescriptions`}
                        >
                          <FilePenLine size={11} />
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
              <article
                key={patient.id}
                className="overflow-hidden rounded-2xl border border-[#c9eef0] bg-white/90 shadow-[0_12px_35px_rgba(16,118,126,0.08)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d3eef0] bg-gradient-to-r from-[#efffff] to-[#dff7f8] px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-[#0f8f99]">
                      #{index + 1} • {patient.serial}
                    </p>
                    <h4 className="mt-0.5 truncate text-sm font-black text-[#12464d]">
                      {patient.name}
                    </h4>
                  </div>

                  <span
                    className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-black ring-1 ${
                      statusClass[patient.status] ||
                      "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>

                <div className="grid gap-2 px-3 py-3 text-xs">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex rounded-md bg-[#e3fbfb] px-2 py-1 text-[10px] font-black text-[#0f8f99] ring-1 ring-[#bdebed]">
                      {patient.id}
                    </span>
                    <a
                      href={`tel:${patient.phone}`}
                      className="inline-flex min-w-0 items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-black text-[#5f858a] ring-1 ring-[#d3eef0]"
                    >
                      <PhoneCall size={10} className="shrink-0" />
                      <span className="truncate">{patient.phone}</span>
                    </a>
                  </div>

                  <div className="rounded-xl border border-[#d3eef0] bg-[#f7ffff] px-2.5 py-2">
                    <span className="text-[10px] font-black text-[#75a7ac]">
                      Problem
                    </span>
                    <p className="mt-1 font-bold leading-5 text-[#12464d]">
                      {patient.complaint}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#d3eef0] bg-white px-2.5 py-2">
                      <span className="text-[10px] font-black text-[#75a7ac]">
                        Diagnosis
                      </span>
                      <p className="mt-1 text-[11px] font-bold leading-5 text-[#12464d]">
                        {patient.diagnosis}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#d3eef0] bg-white px-2.5 py-2">
                      <span className="text-[10px] font-black text-[#75a7ac]">
                        Lab
                      </span>
                      <p className="mt-1 text-[11px] font-semibold leading-5 text-[#5f858a]">
                        {patient.lab}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#bdebed] bg-[#e9fbfb] px-2.5 py-2">
                    <span className="text-[10px] font-black text-[#0f8f99]">
                      Prescription
                    </span>
                    <p className="mt-1 text-[11px] font-semibold leading-5 text-[#12464d]">
                      {patient.prescription}
                    </p>
                  </div>

                  <p className="text-[10px] font-bold text-[#6d969a]">
                    Age {patient.age} • Visit {patient.timeSlot} • Last{" "}
                    {patient.lastVisit}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 border-t border-[#d3eef0] bg-[#f7ffff] px-3 py-3 sm:grid-cols-2">
                  <Link
                    className="inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border border-[#c9eef0] bg-white px-2 py-2 text-[11px] font-black text-[#0f7078] shadow-sm transition hover:bg-[#0f9aa3] hover:text-white active:scale-95"
                    to={`/doctor/patients/${patient.id}`}
                  >
                    <Eye size={12} />
                    View
                  </Link>

                  <Link
                    className="inline-flex min-w-0 items-center justify-center gap-1 rounded-lg bg-[#0f9aa3] px-2 py-2 text-[11px] font-black text-white shadow-sm transition hover:bg-[#0f7f87] active:scale-95"
                    to={`/doctor/patients/${patient.id}/prescriptions`}
                  >
                    <FilePenLine size={12} />
                    Rx
                  </Link>
                </div>
              </article>
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

              <p className="mt-1 max-w-sm text-xs font-semibold leading-5 text-[#6d969a]">
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
