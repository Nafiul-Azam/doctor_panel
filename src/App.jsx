import { Navigate, Route, Routes } from "react-router-dom";
import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import DoctorMessagesPage from "./pages/DoctorMessagesPage";
import DoctorOpenSettingsPage from "./pages/DoctorOpenSettingsPage";
import DoctorPatientDetailsPage from "./pages/DoctorPatientDetailsPage";
import DoctorPrescriptionActionPage from "./pages/DoctorPrescriptionActionPage";
import DoctorPanelSettingsPage from "./pages/DoctorPanelSettingsPage";
import DoctorPatientsPage from "./pages/DoctorPatientsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import PatientRecords from "./components/patients/PatientRecords";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<Navigate to="/doctor/dashboard" replace />} />
        <Route path="dashboard" element={<DoctorDashboardPage />} />
        <Route path="patients" element={<DoctorPatientsPage />} />
        <Route path="patients/:id" element={<DoctorPatientDetailsPage />} />
        <Route
          path="patients/:id/action/:actionType"
          element={<DoctorPrescriptionActionPage />}
        />
        <Route path="messages" element={<DoctorMessagesPage />} />
        <Route path="profile" element={<DoctorProfilePage />} />
        <Route path="panel-settings" element={<DoctorPanelSettingsPage />} />
        <Route path="open-settings" element={<DoctorOpenSettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/doctor/dashboard" replace />} />
      <Route path="/doctor/patient-records" element={<PatientRecords />} />
    </Routes>
  );
}

export default App;
