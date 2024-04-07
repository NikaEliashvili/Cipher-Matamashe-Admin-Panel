import axios from "axios";
import { clearJWT, setUser } from "../../redux/authSlice";
import matamasheApi from "../matamasheApi";

const getUserByToken = async (token, dispatch) => {
  try {
    const response = await matamasheApi.post("/fetch-user", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      dispatch(setUser(response.data));
      return response.data;
    }
  } catch (error) {
    // Check if the error indicates token expiration
    if (error.response && error.response.status === 401) {
      dispatch(clearJWT());
    }
    throw error;
  }
};

export default getUserByToken;
