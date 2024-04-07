import { setNewJWT } from "../../redux/authSlice";
import matamasheApi from "../matamasheApi";

const refreshToken = async (token, dispatch) => {
  try {
    const response = await matamasheApi.post("/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newToken = response.data.token;
    dispatch(setNewJWT(newToken));
  } catch (error) {
    console.error("Error during token refresh:", error);
  }
};

export default refreshToken;
