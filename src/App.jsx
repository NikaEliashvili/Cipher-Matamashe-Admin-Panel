import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";

import "./App.css";
import { useSelector } from "react-redux";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthRequired from "./components/AuthRequired/AuthRequired";
import UploadProducts from "./pages/UploadProducts/UploadProducts";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { authToken } from "./redux/authSlice";

function App() {
  const isLogged = useSelector(authToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRequired />}>
            <Route
              path="/login"
              element={
                !isLogged ? <LoginPage /> : <Navigate to={"/"} />
              }
            />
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
