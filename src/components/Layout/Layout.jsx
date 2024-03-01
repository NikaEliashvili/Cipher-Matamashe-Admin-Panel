import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminSideBar/AdminSideBar";

import "./layout.css";
import AdminUser from "../AdminUser/AdminUser";

function Layout() {
  return (
    <div className="layout">
      <AdminSideBar />
      <Outlet />
      <AdminUser />
    </div>
  );
}

export default Layout;
