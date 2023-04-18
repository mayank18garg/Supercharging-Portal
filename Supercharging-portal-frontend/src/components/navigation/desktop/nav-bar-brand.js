import React from "react";
import { NavLink } from "react-router-dom";
import logoUrl from './logo.svg';
export const NavBarBrand = ({site_id, site_name, userEmail}) => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/dashboard" state={{site_id:site_id, site_name:site_name, userEmail:userEmail}}>
        <img
          className="nav-bar__logo"
          src = {logoUrl}
          alt="Tesla"
          width="122"
          height="36"
        />
      </NavLink>
    </div>
  );
};
