import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { authToken } from "../../redux/authSlice";
import { selectFormData } from "../../redux/uploadFormSlice";
import getUserByToken from "../../services/authServices/getUserByToken";

export default function AuthRequired() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = useSelector(authToken);
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    if (isLogged) {
      const token = isLogged;
      getUserByToken(token, dispatch);
    }
  }, [isLogged, formData]);

  if (isLogged && location.pathname === "/login") {
    return <Navigate to={"/"} />;
  }

  if (location.pathname !== "/login" && !isLogged) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first!",
          prevLoc: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
