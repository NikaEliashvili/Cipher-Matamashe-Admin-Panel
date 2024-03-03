import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signInForm.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import logInService from "../../services/logInService";
import { useDispatch } from "react-redux";
import useSignIn from "../../hooks/useSignIn";

export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState("/icons/eye-closed.svg");
  const userIcon = "/icons/user.svg";
  const eyeClosedIcon = "/icons/eye-closed.svg";
  const eyeOpenedIcon = "/icons/eye-opened.svg";
  const [handleSignIn, isLoading, error] = useSignIn();
  const [signInForm, setSignInForm] = useState({
    login: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSignInForm((prev) => ({ ...prev, [name]: value }));
  }

  function showPass() {
    setEyeIcon((prev) =>
      prev == eyeClosedIcon ? eyeOpenedIcon : eyeClosedIcon
    );
    setInputType(eyeIcon == eyeClosedIcon ? "text" : "password");
  }

  async function submit(e) {
    e.preventDefault();
    handleSignIn(signInForm.login, signInForm.password);
  }

  return (
    <div className="signin-card">
      <div className="title-container">
        <h3 className="title">ავტორიზაცია</h3>
        <p className="subtitle">როგორც ადმინისტრატორი</p>
      </div>
      <form onSubmit={submit} className="form">
        <Input
          errorMessage={
            error && error.status === 404 && error.message
          }
          type="text"
          label="ლოგინი"
          icon={userIcon}
          value={signInForm.login}
          name={"login"}
          onChange={handleChange}
        />
        <Input
          errorMessage={
            error && error.status === 401 && error.message
          }
          type={inputType}
          label="პაროლი"
          icon={eyeIcon}
          value={signInForm.password}
          name={"password"}
          onChange={handleChange}
          showPass={showPass}
        />
        <Button
          isLoading={isLoading}
          classNames="margin"
          type="submit"
        >
          გამოწერა
        </Button>
      </form>
    </div>
  );
}
