import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged } from "./redux/slice";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AuthRequired from "./components/AuthRequired/AuthRequired";
import UploadProducts from "./pages/UploadProducts/UploadProducts";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged?.value);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isLoggedIn")) === true) {
      dispatch(setIsLogged(true));
    }

    console.log(isLogged);
  }, [isLogged]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/login"
            element={
              !isLogged ? (
                <LoginPage />
              ) : (
                <Navigate to={"/admin/dashboard"} />
              )
            }
          />
          <Route element={<AuthRequired />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="upload" element={<UploadProducts />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
