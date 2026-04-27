import { createElement } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/mockData";

const MobileBottomNav = () => {
  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? "active" : ""}`
          }
        >
          {createElement(item.icon, { size: 18 })}
          <span>{item.mobileLabel || item.label}</span>
        </NavLink>
      ))}
      <span className="floating-light" />
    </nav>
  );
};

export default MobileBottomNav;
