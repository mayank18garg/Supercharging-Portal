import React from "react";
import { NavLink } from "react-router-dom";

export const SideNavBarTab = ({ path, label, site_id, site_name, isAdmin}) => {
    return (
        <NavLink
            to={path}
            state={{site_id:site_id, site_name:site_name, isAdmin:isAdmin}}
            end
            className={({isActive}) =>
                "side-nav-bar__tab " + (isActive ? "side-nav-bar__tab--active" : "")
            }
        >
            {label}
        </NavLink>
    )
}