import { createElement } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/mockData";

const DoctorSidebar = () => {
  return (
    <aside className="doctor-sidebar">
      <div className="brand-block">
        <p className="brand-chip">Doctor Panel</p>
        <h1>CareBridge</h1>
        <p className="brand-sub">Clinical workspace</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {createElement(item.icon, { size: 18 })}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DoctorSidebar;
