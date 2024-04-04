import axios from "axios";
import { clearJWT, setUser } from "../../redux/authSlice";

const API_URL_CHECK = "https://api.matamashe.ge/adminCheck.php";

const getUserByToken = async (token, dispatch) => {
  const formDataForToken = new FormData();
  formDataForToken.append("token", token);

  try {
    const response = await axios.post(
      API_URL_CHECK,
      formDataForToken
    );
    if (response.data) {
      dispatch(setUser(response.data));
      return response.data;
    }
  } catch (error) {
    // Check if the error indicates token expiration
    if (error.response && error.response.status === 401) {
      // Token is expired, clear JWT token and user data
      // dispatch(clearJWT());
    }
    throw error;
  }
};

export default getUserByToken;
