import React from "react";
// import { NavBarTabs } from "./navigation/desktop/nav-bar-tabs";
import { AdminBarTabs } from "./admin-bar-tabs";
export const AdminMenu = () => {
    return(
        <div className="admin-bar__container">
            <nav className="admin-bar">
                <AdminBarTabs />
            </nav>
        </div>
    );
};