import React from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../redux/slice";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  function signOut() {
    dispatch(setIsLogged(false));
    localStorage.removeItem("isLoggedIn");
  }
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={signOut}>გასვლა</Button>
      <br />
      <br />
      <br />
      <br />
      <Link to="./upload">
        <Button>ატვირთვა</Button>
      </Link>
    </div>
  );
}
