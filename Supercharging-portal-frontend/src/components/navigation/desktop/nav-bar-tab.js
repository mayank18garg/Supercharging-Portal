import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarTab = ({ path, label, site_id, site_name }) => {
  return (
    <NavLink
      to={path}
      state={{site_id:site_id, site_name:site_name}}
      end
      className={({ isActive }) =>
        "nav-bar__tab " + (isActive ? "nav-bar__tab--active" : "")
      }
    >
      {label}
    </NavLink>
  );
};
