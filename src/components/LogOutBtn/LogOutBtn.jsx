import React from "react";
import "./logOutBtn.css";
import signOut from "../../services/signOut";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../redux/authSlice";
import useSignOut from "../../hooks/useSignOut";
export default function LogOutBtn({ classNames }) {
  const [handleSignOut, isLoading, error] = useSignOut();
  async function signOutBtn() {
    handleSignOut();
  }
  return (
    <button
      onClick={signOutBtn}
      className={"logout-btn " + classNames}
    >
      <img width={16} src="/icons/logout.svg" alt="" />
      გამოსვლა
    </button>
  );
}
