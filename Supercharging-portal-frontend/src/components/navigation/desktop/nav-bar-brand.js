import React from "react";
import { NavLink } from "react-router-dom";
import logoUrl from './logo.svg';
export const NavBarBrand = ({site_id, site_name}) => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/home" state={{site_id:site_id, site_name:site_name}}>
        <img
          className="nav-bar__logo"
          // src="https://cdn.auth0.com/blog/hub/code-samples/hello-world/auth0-logo.svg"
          src = {logoUrl}
          alt="Tesla"
          width="122"
          height="36"
        />
      </NavLink>
    </div>
  );
};
