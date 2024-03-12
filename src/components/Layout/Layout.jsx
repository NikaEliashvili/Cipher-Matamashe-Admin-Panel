import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminSideBar/AdminSideBar";

import "./layout.css";
import AdminUser from "../AdminUser/AdminUser";
import SessionTimeout from "../SessionTimeout/SessionTimeout";

function Layout() {
  return (
    <div className="layout">
      <AdminSideBar />
      <SessionTimeout />
      <div className="outlet">
        <Outlet />
      </div>
      <AdminUser />
    </div>
  );
}

export default Layout;
