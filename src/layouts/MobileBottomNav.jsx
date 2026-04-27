import { createElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/mockData";

const MobileBottomNav = () => {
  const location = useLocation();

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => location.pathname.startsWith(item.path)),
  );

  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Mobile navigation"
      style={{
        "--mobile-nav-active-index": activeIndex,
        "--mobile-nav-count": navItems.length,
      }}
    >
      <span className="mobile-nav-travel-indicator" aria-hidden="true" />
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `mobile-nav-item ${
              item.path === "/doctor/dashboard" ? "home-tab" : ""
            } ${isActive ? "active" : ""}`
          }
        >
          <span className="mobile-nav-icon-wrap">
            {createElement(item.icon, { size: 17, strokeWidth: 2.2 })}
          </span>
          <span className="mobile-nav-label">
            {item.mobileLabel || item.label}
          </span>
        </NavLink>
      ))}
      <span className="floating-light" />
    </nav>
  );
};

export default MobileBottomNav;
