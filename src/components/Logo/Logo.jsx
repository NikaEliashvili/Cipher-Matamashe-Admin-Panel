import React from "react";
import "./logo.css";
function Logo() {
  return (
    <div className="logo">
      <img src="/images/logos/logo_black.svg" alt="" />
      <div className="logo-title-container">
        <h1 className="logo-title">მათამაშე</h1>
        <span className="logo-page-title">ადმინ პანელი</span>
      </div>
    </div>
  );
}

export default Logo;
