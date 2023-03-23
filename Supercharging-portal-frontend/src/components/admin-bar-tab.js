import React from "react";
import { NavLink } from "react-router-dom";

export const AdminBarTab = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end
      className="admin-bar__tab"
    >
      {label}
    </NavLink>
  );
};