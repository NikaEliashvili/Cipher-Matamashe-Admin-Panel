import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { authToken } from "../../redux/authSlice";

export default function AuthRequired() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = useSelector(authToken);
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);
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
