import axios from "axios";
import { clearJWT, setUser } from "../../redux/authSlice";
import { resetForm } from "../../redux/uploadFormSlice";
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
    console.log(error);
    dispatch(clearJWT());
    dispatch(resetForm());

    throw error;
  }
};

export default getUserByToken;
