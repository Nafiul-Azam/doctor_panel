import { useMemo, useState } from "react";
import DashboardSectionHeader from "../components/dashboard/DashboardSectionHeader";
import SearchInput from "../components/common/SearchInput";
import EmptyState from "../components/common/EmptyState";
import PatientFilterBar from "../components/patients/PatientFilterBar";
import PatientQueueCard from "../components/patients/PatientQueueCard";
import PatientSummaryPanel from "../components/patients/PatientSummaryPanel";
import { patientFilters, patients } from "../data/mockData";

const DoctorPatientsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const filterMatch =
        activeFilter === "All" ||
        (activeFilter === "Forwarded"
          ? patient.forwarded
          : patient.status === activeFilter);

      const searchTerm = query.toLowerCase();
      const queryMatch =
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.id.toLowerCase().includes(searchTerm) ||
        patient.complaint.toLowerCase().includes(searchTerm);

      return filterMatch && queryMatch;
    });
  }, [activeFilter, query]);

  const summary = {
    total: patients.length,
    waiting: patients.filter((item) => item.status === "Waiting").length,
    inProgress: patients.filter((item) => item.status === "In Progress").length,
    completed: patients.filter((item) => item.status === "Completed").length,
    forwarded: patients.filter((item) => item.forwarded).length,
  };

  return (
    <section className="page-grid">
      <DashboardSectionHeader
        title="Patient Queue"
        subtitle="Track waiting, skipped, urgent, and assistant-forwarded cases in one view"
      />

      <PatientSummaryPanel {...summary} />
      <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
      <PatientFilterBar
        filters={patientFilters}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div className="patient-list-grid">
        {filteredPatients.length ? (
          filteredPatients.map((patient) => (
            <PatientQueueCard key={patient.id} patient={patient} />
          ))
        ) : (
          <EmptyState
            title="No matching patient"
            subtitle="Try another filter or search keyword."
          />
        )}
      </div>
    </section>
  );
};

export default DoctorPatientsPage;
