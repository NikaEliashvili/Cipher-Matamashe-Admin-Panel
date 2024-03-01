import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./adminSideBar.css";
import Logo from "../Logo/Logo";
import adminRoutes from "../../constants/adminRoutes";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
export default function AdminSideBar() {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <Logo />
      </div>

      <ul className="nav-links">
        {adminRoutes?.map(({ path, name, icon }, index) => (
          <li key={index + 1} className="nav-link-li">
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {icon && <img className="nav-link-icon" src={icon} />}
              <span className="nav-link-name">{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <LogOutBtn classNames="margin-top" />
    </div>
  );
}
