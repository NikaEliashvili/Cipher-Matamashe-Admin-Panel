import React from "react";
import "./pageHeader.css";
export default function PageHeader(props) {
  const { icon, title, subtitle } = props;
  return (
    <div className="page-header">
      <img className="header-icon" src={icon} alt="" />
      <div className="titles">
        <h1 className="header-title">{title}</h1>
        <span className="header-subtitle">{subtitle}</span>
      </div>
    </div>
  );
}
