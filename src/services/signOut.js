import axios from "axios";
import { clearJWT } from "../redux/authSlice";

const API_URL = "https://api.matamashe.ge/adminSignout.php";

const signOut = async (token, dispatch) => {
  const formData = new FormData();
  formData.append("token", token);

  try {
    const response = await axios.post(API_URL, formData);
    // Dispatch the action directly.
    dispatch(clearJWT());
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export default signOut;
