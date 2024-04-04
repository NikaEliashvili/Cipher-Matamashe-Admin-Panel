import { jwtDecode } from "jwt-decode";
import { setNewJWT } from "../../redux/authSlice";
import matamasheApi from "../matamasheApi";

const logInService = async (username, password, dispatch) => {
  try {
    const response = await matamasheApi.post("/login", {
      username: username,
      password: password,
    });
    const newToken = response.data.token;

    // Dispatch the action directly.
    dispatch(setNewJWT(newToken));
    return newToken;
  } catch (error) {
    throw error.response;
  }
};

export default logInService;
