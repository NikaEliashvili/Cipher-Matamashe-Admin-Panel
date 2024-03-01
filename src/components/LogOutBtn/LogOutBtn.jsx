import React from "react";
import "./logOutBtn.css";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../redux/slice";
export default function LogOutBtn({ classNames }) {
  const dispatch = useDispatch();

  function signOut() {
    dispatch(setIsLogged(false));
    localStorage.removeItem("isLoggedIn");
  }
  return (
    <button onClick={signOut} className={"logout-btn " + classNames}>
      <img width={16} src="/icons/logout.svg" alt="" />
      გამოსვლა
    </button>
  );
}
