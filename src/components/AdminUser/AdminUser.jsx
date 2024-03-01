import React, { useEffect, useState } from "react";

import "./adminUser.css";
import getUserByToken from "../../services/getUserByToken";
export default function AdminUser() {
  const [adminUser, setAdminUser] = useState(null);
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));

    async function getUser() {
      await getUserByToken(jwt);
    }

    console.log(getUser());
  }, []);

  return (
    <div className="user-container">
      <div className="user-info">
        <h4 className="user-name">User_Name</h4>
        <span className="user-email">useremail@gmail.com</span>
      </div>
      <div className="user-img-div">
        <img
          className="user-img"
          src="/images/user/user_bg.svg"
          alt=""
        />
        <div className="user-name-first-letter">U</div>
      </div>
    </div>
  );
}
