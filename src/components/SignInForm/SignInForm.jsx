import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signInForm.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../redux/slice";
import logInService from "../../services/logInService";

export default function SignInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState("/icons/eye-closed.svg");
  const userIcon = "/icons/user.svg";
  const eyeClosedIcon = "/icons/eye-closed.svg";
  const eyeOpenedIcon = "/icons/eye-opened.svg";
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
    localStorage.setItem("isLoggedIn", "true");
    dispatch(setIsLogged(true));
    navigate("/");
    /* Implement Api Request Here */

    const response = await logInService(
      signInForm.login,
      signInForm.password
    );

    console.log({ response });
  }

  return (
    <div className="signin-card">
      <div className="title-container">
        <h3 className="title">ავტორიზაცია</h3>
        <p className="subtitle">როგორც ადმინისტრატორი</p>
      </div>
      <form onSubmit={submit} className="form">
        <Input
          type="text"
          label="ლოგინი"
          icon={userIcon}
          value={signInForm.login}
          name={"login"}
          onChange={handleChange}
        />
        <Input
          type={inputType}
          label="პაროლი"
          icon={eyeIcon}
          value={signInForm.password}
          name={"password"}
          onChange={handleChange}
          showPass={showPass}
        />
        <Button classNames="margin" type="submit">
          გამოწერა
        </Button>
      </form>
    </div>
  );
}
