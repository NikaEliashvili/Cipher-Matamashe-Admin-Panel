import axios from "axios";
import { setNewJWT } from "../redux/authSlice";

const API_URL = "https://api.matamashe.ge/adminSignin.php";

const logInService = async (username, password, dispatch) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await axios.post(API_URL, formData);
    const newToken = response.data.token;

    // Dispatch the action directly.
    dispatch(setNewJWT(newToken));
    return newToken;
  } catch (error) {
    throw error.response;
  }
};

export default logInService;
