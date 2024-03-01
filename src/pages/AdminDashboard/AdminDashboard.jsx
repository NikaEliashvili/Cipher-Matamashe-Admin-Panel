import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import LogOutBtn from "../../components/LogOutBtn/LogOutBtn";

export default function AdminDashboard() {
  return (
    <div>
      <h4>Admin Dashboard</h4>
      <LogOutBtn />
      <br />
      <br />
      <Link to="./upload">
        <Button>ატვირთვა</Button>
      </Link>
    </div>
  );
}
