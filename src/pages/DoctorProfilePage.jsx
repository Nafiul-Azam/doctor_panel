import { useState } from "react";
import ChamberScheduleCard from "../components/profile/ChamberScheduleCard";
import DoctorPanelSettingsCard from "../components/profile/DoctorPanelSettingsCard";
import DoctorProfileCard from "../components/profile/DoctorProfileCard";
import EditProfileForm from "../components/profile/EditProfileForm";
import ProfileInfoSection from "../components/profile/ProfileInfoSection";
import { doctorInfo, profileSections } from "../data/mockData";

const DoctorProfilePage = () => {
  const [form, setForm] = useState({
    name: doctorInfo.name,
    department: doctorInfo.department,
    specialization: doctorInfo.specialization,
    consultationHours: "09:00 AM - 01:00 PM",
    sessionStart: "09:00",
    sessionEnd: "13:00",
    mode: "In-person",
  });

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="page-grid profile-page">
      <DoctorProfileCard doctor={doctorInfo} />
      <div className="dashboard-split profile-top-grid">
        <ProfileInfoSection
          title={profileSections[0].title}
          rows={profileSections[0].rows}
        />
        <ProfileInfoSection
          title={profileSections[1].title}
          rows={profileSections[1].rows}
        />
      </div>
      <div className="dashboard-split profile-mid-grid">
        <ChamberScheduleCard schedule={doctorInfo.schedule} />
        <DoctorPanelSettingsCard />
      </div>
      <EditProfileForm form={form} onChange={updateForm} />
    </section>
  );
};

export default DoctorProfilePage;
