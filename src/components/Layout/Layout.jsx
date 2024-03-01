import React from "react";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      {/* SideBar */}
      <AdminSideBar />
      {/* Logo */}
      <Outlet />
    </div>
  );
}

export default Layout;
