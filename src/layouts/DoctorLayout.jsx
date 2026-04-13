import { Outlet } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import MobileBottomNav from "./MobileBottomNav";
import PanelHeader from "./PanelHeader";

const DoctorLayout = () => {
  return (
    <div className="doctor-shell">
      <DoctorSidebar />
      <main className="doctor-content-wrap">
        <PanelHeader />
        <div className="doctor-page-content">
          <Outlet />
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default DoctorLayout;
