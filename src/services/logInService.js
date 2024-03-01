// services/logInService.js
import axios from "axios";

const API_URL = "https://api.matamashe.ge/adminSignin.php";

const API_URL_CHECK = "https://api.matamashe.ge/adminCheck.php";

export default async function logInService(username, password) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  try {
    const response = await axios.post(API_URL, formData);
    localStorage.setItem("jwt", response.data.token);
    return response.data;
  } catch (error) {
    return error;
  }
}
