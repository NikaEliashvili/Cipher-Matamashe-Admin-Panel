import { useEffect } from "react";
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
import AuthRequired from "./components/AuthRequired/AuthRequired";
import UploadProducts from "./pages/UploadProducts/UploadProducts";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged?.value);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isLoggedIn")) === true) {
      dispatch(setIsLogged(true));
    }
  }, [isLogged]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !isLogged ? <LoginPage /> : <Navigate to={"/"} />
            }
          />
          <Route element={<AuthRequired />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="upload" element={<UploadProducts />} />
              <Route path="analytics" element={<UploadProducts />} />
              <Route path="messages" element={<UploadProducts />} />
              <Route path="accounts" element={<UploadProducts />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
